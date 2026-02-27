import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入路由地图
import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
app.use(router); // 告诉 Vue 使用路由
app.use(Vant);
app.mount('#app');