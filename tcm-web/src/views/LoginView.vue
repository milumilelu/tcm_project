<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f2f5;">
    <div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 300px; text-align: center;">
      <h2 style="color: #2c3e50; margin-top: 0;">医生工作台登录</h2>
      
      <van-form @submit="onLogin" style="margin-top: 20px;">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="账号"
            placeholder="请输入 admin"
            :rules="[{ required: true, message: '请填写账号' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入 123456"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin-top: 30px;">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <p style="color: #999; font-size: 12px; margin-top: 20px;">测试账号：admin / 密码：123456</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant'; // 引入 Vant 的轻提示

const router = useRouter();
const username = ref('');
const password = ref('');

const onLogin = () => {
  // 模拟去后端验证账号密码
  if (username.value === 'admin' && password.value === '123456') {
    showToast('登录成功！');
    // 【核心魔法】在浏览器的 localStorage 里发一张“通行证”（真实开发中这里通常是存 Token）
    localStorage.setItem('doctor_auth_token', 'secret_token_888');
    // 登录成功后，用代码强行跳转到医生工作台
    router.push('/doctor');
  } else {
    showToast('账号或密码错误！');
  }
};
</script>