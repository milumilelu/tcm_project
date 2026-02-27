import { createRouter, createWebHistory } from 'vue-router'
import PortalView from '../views/PortalView.vue' // 【新增】引入统一入口页
import PatientView from '../views/PatientView.vue'
import DoctorView from '../views/DoctorView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  // 【修改】当用户输入域名时，直接展示统一门户，而不是偷偷跳转
  { path: '/', name: 'Portal', component: PortalView },
  
  { path: '/patient', name: 'Patient', component: PatientView },
  { path: '/login', name: 'Login', component: LoginView },
  { 
    path: '/doctor', 
    name: 'Doctor', 
    component: DoctorView,
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局守卫（保安小哥）保持不变
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('doctor_auth_token');
    if (token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

export default router