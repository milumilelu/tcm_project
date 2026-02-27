<template>
  <div class="portal-container">
    <div class="patient-login-box">
      <h2 class="title">古经方问诊系统</h2>
      <p class="subtitle">请填写基础信息开始问诊</p>
      
      <van-form @submit="onPatientEnter">
        <van-cell-group inset>
          <van-field
            v-model="patientInfo.name"
            name="姓名"
            label="姓名"
            placeholder="请输入您的姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
          />
          <van-field
            v-model="patientInfo.age"
            type="digit"
            name="年龄"
            label="年龄"
            placeholder="请输入年龄"
            :rules="[{ required: true, message: '请填写年龄' }]"
          />
          <van-field name="gender" label="性别">
            <template #input>
              <van-radio-group v-model="patientInfo.gender" direction="horizontal">
                <van-radio name="男">男</van-radio>
                <van-radio name="女">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        
        <div style="margin-top: 30px;">
          <van-button round block type="primary" native-type="submit">
            开始问诊
          </van-button>
        </div>
      </van-form>
    </div>

    <div class="doctor-entrance" @click="goToDoctorLogin">
      医生登录入口 👉
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 患者基础信息
const patientInfo = ref({
  name: '',
  age: '',
  gender: '男'
});

// 点击“开始问诊”触发
const onPatientEnter = () => {
  // 1. 把患者的姓名、年龄、性别暂存到浏览器的缓存里
  localStorage.setItem('current_patient', JSON.stringify(patientInfo.value));
  
  // 2. 跳转到我们之前写好的患者 4 步问诊单页面
  router.push('/patient');
};

// 点击右下角触发
const goToDoctorLogin = () => {
  // 跳转到医生专属的账号密码登录页
  router.push('/login');
};
</script>

<style scoped>
/* 整个屏幕的背景 */
.portal-container {
  height: 100vh;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  background: linear-gradient(135deg, #f0f2f5 0%, #e0eaf5 100%);
  position: relative;      /* 相对定位，为了让右下角的按钮能找到参考系 */
}

/* 中央的患者卡片 */
.patient-login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  width: 320px;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 30px;
}

/* 右下角的医生通道（绝对定位） */
.doctor-entrance {
  position: absolute;
  bottom: 30px;
  right: 30px;
  color: #7f8c8d;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  border: 1px solid #bdc3c7;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

/* 鼠标悬停时的动画效果 */
.doctor-entrance:hover {
  background: #3498db;
  color: white;
  border-color: #3498db;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}
</style>