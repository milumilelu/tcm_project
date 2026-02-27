<template>
  <div class="doctor-dashboard">
    <header class="header">
      <div class="logo-area">
        <h2>古经方问诊 - 医生工作台 (2.0)</h2>
        <span class="status-tag">今日坐诊</span>
      </div>
      <div class="user-actions">
        <span class="doctor-name">欢迎您，Admin 医生</span>
        <button class="logout-btn" @click="onLogout">退出登录</button>
      </div>
    </header>

    <div class="main-container">
      <div class="sidebar">
        <div class="sidebar-header">
          <h3>待诊患者 ({{ patientList.length }})</h3>
        </div>
        <ul class="patient-list">
          <li 
            v-for="patient in patientList" 
            :key="patient._id"
            :class="['patient-item', { active: activePatient && activePatient._id === patient._id }]"
            @click="selectPatient(patient)"
          >
            <div class="p-name">
              {{ patient.patient_info.name }} ({{ patient.patient_info.gender }}, {{ patient.patient_info.age }}岁)
            </div>
            <div class="p-time">提交于: {{ new Date(patient.created_at).toLocaleString() }}</div>
          </li>
        </ul>
      </div>

      <div class="left-panel" v-if="activePatient">
        <div class="patient-info">
          <h3>患者详情：{{ activePatient.patient_info.name }}</h3>
          <p><strong>数据库记录 ID：</strong> {{ activePatient._id }}</p>
        </div>

        <div class="medical-record">
          <div class="record-card">
            <h4>1. 整体体感与寒热出汗</h4>
            <p v-if="activePatient.medical_record.painType.length">
              <strong>痛感与异常：</strong> 
              <span class="highlight-tag">{{ activePatient.medical_record.painType.join('、') }}</span>
            </p>
            <p v-if="activePatient.medical_record.painDetail">
              <strong>具体描述：</strong> {{ activePatient.medical_record.painDetail }}
            </p>
            <p><strong>出汗情况：</strong> {{ activePatient.medical_record.sweatCondition }}</p>
            <p v-if="activePatient.medical_record.coldHeat.length">
              <strong>寒热感知：</strong> {{ activePatient.medical_record.coldHeat.join('、') }}
            </p>
          </div>

          <div class="record-card">
            <h4>2. 头胸与五官状态</h4>
            <p v-if="activePatient.medical_record.headLocation.length">
              <strong>头部位置：</strong> {{ activePatient.medical_record.headLocation.join('、') }}
            </p>
            <p v-if="activePatient.medical_record.mouthFeeling.length">
              <strong>口部感受：</strong> {{ activePatient.medical_record.mouthFeeling.join('、') }}
            </p>
            <p v-if="activePatient.medical_record.chestFeeling.length">
              <strong>胸腔状态：</strong> 
              <span class="highlight-tag warning">{{ activePatient.medical_record.chestFeeling.join('、') }}</span>
            </p>
          </div>

          <div class="record-card">
            <h4>3. 消化与排泄情况</h4>
            <p v-if="activePatient.medical_record.digestion.length">
              <strong>脾胃状态：</strong> {{ activePatient.medical_record.digestion.join('、') }}
            </p>
            <p v-if="activePatient.medical_record.stoolFeature.length">
              <strong>大便特征：</strong> <span class="highlight-tag warning">{{ activePatient.medical_record.stoolFeature.join('、') }}</span>
            </p>
            <p v-if="activePatient.medical_record.urineFeature">
              <strong>小便情况：</strong> {{ activePatient.medical_record.urineFeature }}
            </p>
          </div>
          
          <div class="record-card" style="margin-bottom: 50px;">
            <h4>4. 医生辨证结论</h4>
            <textarea placeholder="请在此输入您的辨证分析与处方..." class="doctor-notes"></textarea>
            <button class="submit-btn">保存诊断结果</button>
          </div>
        </div>
      </div>

      <div class="right-panel" v-if="activePatient">
        <h3>可视分析影像</h3>
        <div class="visual-card">
          <h4>腹诊痛点定位</h4>
          <svg width="200" height="280" viewBox="0 0 300 400" class="abdomen-svg">
            <path d="M 50 50 C 50 200, 50 350, 80 400 L 220 400 C 250 350, 250 200, 250 50 Z" fill="none" stroke="#eebf99" stroke-width="3"/>
            <path id="region-7" d="M 100 100 L 200 100 L 150 160 Z" stroke="#333" stroke-width="1.5" stroke-dasharray="4" :fill="getFillColor('心下')" />
            <text x="135" y="125" font-size="14" fill="#333">心下</text>
            
            <circle id="region-8" cx="150" cy="210" r="45" stroke="#333" stroke-width="1.5" stroke-dasharray="4" :fill="getFillColor('脐部')" />
            <text x="135" y="215" font-size="14" fill="#333">脐部</text>
            
            <path id="region-9" d="M 105 270 L 195 270 L 150 340 Z" stroke="#333" stroke-width="1.5" stroke-dasharray="4" :fill="getFillColor('小腹')" />
            <text x="135" y="295" font-size="14" fill="#333">小腹</text>
          </svg>
          
          <div class="symptom-legend" style="margin-top: 15px; font-size: 13px;">
            <p v-if="activePatient.medical_record.abdomenData['心下']">
              <strong>心下：</strong>{{ activePatient.medical_record.abdomenData['心下'].join('、') }}
            </p>
            <p v-if="activePatient.medical_record.abdomenData['脐部']">
              <strong>脐部：</strong>{{ activePatient.medical_record.abdomenData['脐部'].join('、') }}
            </p>
            <p v-if="activePatient.medical_record.abdomenData['小腹']">
              <strong>小腹：</strong>{{ activePatient.medical_record.abdomenData['小腹'].join('、') }}
            </p>
          </div>
        </div>

        <div class="visual-card">
          <h4>患者上传照片</h4>
          <div class="mock-image">
            {{ activePatient.medical_record.tongueImages.length > 0 ? '点击查看舌象照' : '未上传舌象照片' }}
          </div>
        </div>
      </div>

      <div class="empty-state" v-else>
        <p>👈 请从左侧列表中选择一位患者开始看诊</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // 确保这一行没写错
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

const router = useRouter();
const patientList = ref([]); // 👈 关键：初始必须是空数组，不要留假数据
const activePatient = ref(null);

// 【核心逻辑】页面加载时去数据库拿真数据
onMounted(async () => {
  try {
    // 拨打后端的取件电话
    const res = await axios.get('http://localhost:3000/api/records');
    
    // 如果后端返回 code 200，说明拿到了
    if (res.data.code === 200) {
      patientList.value = res.data.data;
      console.log('医生端拿到的真数据：', patientList.value);
      
      // 默认选中第一个人
      if (patientList.value.length > 0) {
        activePatient.value = patientList.value[0];
      }
    }
  } catch (err) {
    console.error('获取病历失败，请检查后端是否启动:', err);
    showToast('无法连接服务器');
  }
});
// ================= 2. 交互逻辑 =================

// 点击左侧列表，切换右侧显示的数据
const selectPatient = (patient) => {
  activePatient.value = patient;
};

// 动态计算 SVG 腹诊图的颜色（根据当前选中患者的数据）
const getFillColor = (regionName) => {
  if (!activePatient.value || !activePatient.value.medical_record.abdomenData) return 'transparent';
  // 这里从 medical_record 读取数据
  const symptoms = activePatient.value.medical_record.abdomenData[regionName];
  return (symptoms && symptoms.length > 0) ? 'rgba(238, 10, 36, 0.4)' : 'transparent';
};

// 【核心逻辑】退出登录
const onLogout = () => {
  // 1. 撕毁“通行证”（清空 localStorage 里的 token）
  localStorage.removeItem('doctor_auth_token');
  showToast('已安全退出');
  // 2. 把医生踢回登录页面
  router.push('/login');
};
</script>

<style>
/* ====== 漂亮的 CSS 三栏布局 ====== */
body { margin: 0; background-color: #f0f2f5; font-family: sans-serif; }
.doctor-dashboard { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.header { background: #2c3e50; color: white; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; height: 60px; }
.logo-area { display: flex; align-items: center; gap: 15px; }
.status-tag { background: #27ae60; padding: 4px 12px; border-radius: 12px; font-size: 14px; }
.user-actions { display: flex; align-items: center; gap: 20px; }
.doctor-name { font-size: 14px; color: #ecf0f1; }
/* 退出登录按钮样式 */
.logout-btn { background: transparent; color: #e74c3c; border: 1px solid #e74c3c; padding: 5px 15px; border-radius: 4px; cursor: pointer; transition: all 0.3s; }
.logout-btn:hover { background: #e74c3c; color: white; }

.main-container { display: flex; flex: 1; overflow: hidden; }

/* 侧边栏：患者列表 */
.sidebar { flex: 2; min-width: 250px; background: #fff; border-right: 1px solid #ddd; display: flex; flex-direction: column; overflow-y: auto; z-index: 10; }
.sidebar-header { padding: 15px 20px; border-bottom: 1px solid #f0f0f0; background: #fafafa; }
.sidebar-header h3 { margin: 0; font-size: 16px; color: #333; }
.patient-list { list-style: none; padding: 0; margin: 0; }
.patient-item { padding: 15px 20px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background 0.2s; }
.patient-item:hover { background: #f9f9f9; }
/* 选中患者时的高亮状态 */
.patient-item.active { background: #e6f7ff; border-left: 4px solid #1890ff; padding-left: 16px; }
.p-name { font-size: 15px; font-weight: bold; color: #333; margin-bottom: 5px; }
.p-time { font-size: 12px; color: #888; }

/* 中间栏：病历文本 */
.left-panel { flex: 4; padding: 20px; overflow-y: auto; }
/* 右侧栏：影像 */
.right-panel { flex: 3; background: #fff; border-left: 1px solid #ddd; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; align-items: center; box-shadow: -2px 0 8px rgba(0,0,0,0.05); }

/* 卡片与组件通用样式 */
.record-card, .visual-card { background: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); width: 100%; box-sizing: border-box; }
.highlight-tag { background: #e6f7ff; color: #1890ff; padding: 2px 6px; border-radius: 4px; border: 1px solid #91d5ff; }
.warning { background: #fff2e8; color: #fa541c; border-color: #ffbb96; }
.abdomen-svg { display: block; margin: 0 auto; background: #fafafa; border-radius: 8px; }
.doctor-notes { width: 100%; height: 100px; padding: 10px; border: 1px solid #d9d9d9; border-radius: 4px; resize: vertical; margin-bottom: 10px; box-sizing: border-box;}
.submit-btn { background: #1890ff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; float: right; }
.submit-btn:hover { background: #40a9ff; }
.empty-state { flex: 7; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #999; background: #f9f9f9; }
</style>