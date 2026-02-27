<template>
  <div style="padding: 20px; background-color: #f7f8fa; min-height: 100vh; padding-bottom: 80px;">
    <div style="text-align: center; margin-bottom: 10px;">
      <h2 style="color: #323233; margin-bottom: 5px;">古经方问诊 ({{ currentStep }}/4)</h2>
      <span style="color: #1890ff; font-size: 14px; background: #e6f7ff; padding: 4px 12px; border-radius: 12px;">
        当前就诊人：{{ patientProfile.name }} ({{ patientProfile.gender }}, {{ patientProfile.age }}岁)
      </span>
    </div>
    
    <van-progress :percentage="(currentStep / 4) * 100" stroke-width="8" style="margin-bottom: 20px;" />

    <van-form @submit="onSubmit">
      
      <div v-show="currentStep === 1">
        <van-cell-group inset title="1. 身体痛感与异常 (Q1, Q13-Q14, Q31-Q33)">
          <van-field name="painType" label="身体异常" label-align="top">
            <template #input>
              <van-checkbox-group v-model="formData.painType" direction="horizontal">
                <van-checkbox name="酸痛" shape="square" style="margin-bottom: 8px;">酸痛</van-checkbox>
                <van-checkbox name="沉重痛" shape="square" style="margin-bottom: 8px;">沉重痛</van-checkbox>
                <van-checkbox name="刺痛" shape="square" style="margin-bottom: 8px;">刺痛</van-checkbox>
                <van-checkbox name="全身紧缚感" shape="square" style="margin-bottom: 8px;">全身紧缚感</van-checkbox>
                <van-checkbox name="没劲乏力" shape="square" style="margin-bottom: 8px;">没劲乏力</van-checkbox>
                <van-checkbox name="麻木" shape="square" style="margin-bottom: 8px;">麻木</van-checkbox>
                <van-checkbox name="灌铅沉重感" shape="square" style="margin-bottom: 8px;">灌铅沉重感</van-checkbox>
                <van-checkbox name="身体浮肿" shape="square" style="margin-bottom: 8px;">身体浮肿</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field v-if="formData.painType.length > 0" v-model="formData.painDetail" rows="2" autosize label="补充说明" type="textarea" placeholder="请详细写出疼痛、麻木、浮肿的具体部位及感受..." />
        </van-cell-group>

        <van-cell-group inset title="2. 寒热与出汗 (Q2, Q26-Q28)" style="margin-top: 16px;">
          <van-field name="sweatCondition" label="出汗情况" label-align="top">
            <template #input>
              <van-radio-group v-model="formData.sweatCondition" direction="horizontal">
                <van-radio name="容易出汗" style="margin-bottom: 8px;">容易出汗</van-radio>
                <van-radio name="一点汗也没有" style="margin-bottom: 8px;">无汗</van-radio>
                <van-radio name="局部多汗/少汗" style="margin-bottom: 8px;">局部多汗/少汗</van-radio>
                <van-radio name="烘热汗出" style="margin-bottom: 8px;">突然烘热汗出</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="coldHeat" label="寒热感知" label-align="top">
            <template #input>
              <van-checkbox-group v-model="formData.coldHeat" direction="horizontal">
                <van-checkbox name="全身怕冷" shape="square" style="margin-bottom: 8px;">全身怕冷</van-checkbox>
                <van-checkbox name="手足冰冷" shape="square" style="margin-bottom: 8px;">手足冰冷</van-checkbox>
                <van-checkbox name="局部怕冷" shape="square" style="margin-bottom: 8px;">背部/腰膝等局部怕冷</van-checkbox>
                <van-checkbox name="非常怕热" shape="square" style="margin-bottom: 8px;">非常怕热</van-checkbox>
                <van-checkbox name="手足心热" shape="square" style="margin-bottom: 8px;">手足心热</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </van-cell-group>

        <van-cell-group inset title="3. 精神与呼吸 (Q25)" style="margin-top: 16px;">
          <van-field name="fatigue" label="具体表现" label-align="top">
            <template #input>
              <van-checkbox-group v-model="formData.fatigue" direction="horizontal">
                <van-checkbox name="疲劳精神倦怠" shape="square" style="margin-bottom: 8px;">疲劳精神倦怠</van-checkbox>
                <van-checkbox name="短气/呼吸无力" shape="square" style="margin-bottom: 8px;">短气/呼吸无力</van-checkbox>
                <van-checkbox name="说话/动则气喘" shape="square" style="margin-bottom: 8px;">说话/动则气喘</van-checkbox>
                <van-checkbox name="怕风吹" shape="square" style="margin-bottom: 8px;">怕风吹</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </van-cell-group>

        <div style="margin: 32px 16px;"><van-button round block type="primary" @click="nextStep">下一步：头胸与五官</van-button></div>
      </div>

      <div v-show="currentStep === 2">
        <van-cell-group inset title="4. 头部与五官 (Q15-Q18, Q24, Q29)">
          <van-field name="headLocation" label="头部不适" label-align="top">
            <template #input>
              <van-checkbox-group v-model="formData.headLocation" direction="horizontal">
                <van-checkbox name="前额" shape="square" style="margin-bottom: 8px;">前额</van-checkbox>
                <van-checkbox name="两侧" shape="square" style="margin-bottom: 8px;">两侧</van-checkbox>
                <van-checkbox name="后脑勺" shape="square" style="margin-bottom: 8px;">后脑勺</van-checkbox>
                <van-checkbox name="头顶" shape="square" style="margin-bottom: 8px;">头顶</van-checkbox>
                <van-checkbox name="头晕目眩" shape="square" style="margin-bottom: 8px;">头晕目眩</van-checkbox>
                <van-checkbox name="沉重朦胧感" shape="square" style="margin-bottom: 8px;">被裹沉重朦胧</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field name="mouthFeeling" label="口部感受" label-align="top">
            <template #input>
              <van-checkbox-group v-model="formData.mouthFeeling" direction="horizontal">
                <van-checkbox name="口干想喝水" shape="square" style="margin-bottom: 8px;">口干想喝水</van-checkbox>
                <van-checkbox name="口苦" shape="square" style="margin-bottom: 8px;">口苦</van-checkbox>
                <van-checkbox name="口黏腻" shape="square" style="margin-bottom: 8px;">口黏腻</van-checkbox>
                <van-checkbox name="口泛清水/作呕" shape="square" style="margin-bottom: 8px;">口泛清水/作呕</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </van-cell-group>

        <van-cell-group inset title="5. 呼吸道分泌物与胸腔 (Q3-Q6, Q20-Q22)" style="margin-top: 16px;">
          <van-field v-model="formData.secretions" rows="2" autosize label="鼻涕/咳痰" type="textarea" placeholder="是否有鼻涕或咳痰？请描述量多/少、颜色、稀/稠，以及咽喉是否疼痛干燥？" label-align="top" />
          <van-field name="chestFeeling" label="胸腔状态" label-align="top">
            <template #input>
              <van-checkbox-group v-model="formData.chestFeeling" direction="horizontal">
                <van-checkbox name="堵闷满闷" shape="square" style="margin-bottom: 8px;">堵闷满闷</van-checkbox>
                <van-checkbox name="有火烦躁" shape="square" style="margin-bottom: 8px;">有团火/烦躁</van-checkbox>
                <van-checkbox name="胸中清冷" shape="square" style="margin-bottom: 8px;">胸中清冷</van-checkbox>
                <van-checkbox name="心慌气冲" shape="square" style="margin-bottom: 8px;">心慌/气上冲</van-checkbox>
                <van-checkbox name="局部疼痛" shape="square" style="margin-bottom: 8px;">有局部疼痛</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </van-cell-group>

        <div style="margin: 32px 16px; display: flex; gap: 10px;">
          <van-button round block plain type="primary" @click="prevStep">上一步</van-button>
          <van-button round block type="primary" @click="nextStep">下一步：腹部定位</van-button>
        </div>
      </div>

      <div v-show="currentStep === 3" style="text-align: center;">
        <h3 style="color: #666; font-size: 15px; margin-bottom: 15px;">6. 腹诊：请点击下方部位标记痛点</h3>
        <svg width="260" height="350" viewBox="0 0 300 400" style="background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <path d="M 50 50 C 50 200, 50 350, 80 400 L 220 400 C 250 350, 250 200, 250 50 Z" fill="none" stroke="#eebf99" stroke-width="3"/>
          <path id="region-7" d="M 100 100 L 200 100 L 150 160 Z" stroke="#333" stroke-width="1.5" stroke-dasharray="4" style="cursor: pointer; transition: fill 0.3s;" :fill="getFillColor('心下')" @click="onRegionClick('心下')" />
          <text x="135" y="125" font-size="14" fill="#333" pointer-events="none">心下</text>
          <path id="region-3" d="M 200 100 L 250 160 L 200 210 Z" stroke="#333" stroke-width="1.5" stroke-dasharray="4" style="cursor: pointer;" :fill="getFillColor('左胁部')" @click="onRegionClick('左胁部')" />
          <text x="210" y="160" font-size="12" fill="#333" pointer-events="none">左胁部</text>
          <path id="region-4" d="M 100 100 L 50 160 L 100 210 Z" stroke="#333" stroke-width="1.5" stroke-dasharray="4" style="cursor: pointer;" :fill="getFillColor('右胁部')" @click="onRegionClick('右胁部')" />
          <text x="60" y="160" font-size="12" fill="#333" pointer-events="none">右胁部</text>
          <circle id="region-8" cx="150" cy="210" r="45" stroke="#333" stroke-width="1.5" stroke-dasharray="4" style="cursor: pointer; transition: fill 0.3s;" :fill="getFillColor('脐部')" @click="onRegionClick('脐部')" />
          <text x="135" y="215" font-size="14" fill="#333" pointer-events="none">脐部</text>
          <path id="region-10" d="M 195 270 L 250 270 L 220 340 Z" stroke="#333" stroke-width="1.5" stroke-dasharray="4" style="cursor: pointer;" :fill="getFillColor('左少腹')" @click="onRegionClick('左少腹')" />
          <text x="210" y="295" font-size="12" fill="#333" pointer-events="none">左少腹</text>
          <path id="region-11" d="M 105 270 L 50 270 L 80 340 Z" stroke="#333" stroke-width="1.5" stroke-dasharray="4" style="cursor: pointer;" :fill="getFillColor('右少腹')" @click="onRegionClick('右少腹')" />
          <text x="55" y="295" font-size="12" fill="#333" pointer-events="none">右少腹</text>
          <path id="region-9" d="M 105 270 L 195 270 L 150 340 Z" stroke="#333" stroke-width="1.5" stroke-dasharray="4" style="cursor: pointer; transition: fill 0.3s;" :fill="getFillColor('小腹')" @click="onRegionClick('小腹')" />
          <text x="135" y="295" font-size="14" fill="#333" pointer-events="none">小腹</text>
        </svg>

        <van-cell-group inset title="腹部痛感补充 (Q19)" style="margin-top: 16px; text-align: left;">
           <van-field v-model="formData.abdomenPainDetail" rows="2" autosize type="textarea" placeholder="上述部位是胀痛、刺痛、痉挛痛还是绞痛？请说明。" />
        </van-cell-group>

        <div style="margin: 32px 16px; display: flex; gap: 10px;">
          <van-button round block plain type="primary" @click="prevStep">上一步</van-button>
          <van-button round block type="primary" @click="nextStep">下一步：消化排泄</van-button>
        </div>
      </div>

      <div v-show="currentStep === 4">
        <van-cell-group inset title="7. 消化与脾胃 (Q7-Q12)">
          <van-field name="digestion" label="胃部状态" label-align="top">
            <template #input>
              <van-checkbox-group v-model="formData.digestion" direction="horizontal">
                <van-checkbox name="不消化/胃堵" shape="square" style="margin-bottom: 8px;">吃点就不消化/堵塞</van-checkbox>
                <van-checkbox name="灼热烧心" shape="square" style="margin-bottom: 8px;">胃部/食道灼热烧心</van-checkbox>
                <van-checkbox name="爱嗝气放屁" shape="square" style="margin-bottom: 8px;">爱嗝气/放屁</van-checkbox>
                <van-checkbox name="肉食油腻不适" shape="square" style="margin-bottom: 8px;">吃油腻肉食不适</van-checkbox>
                <van-checkbox name="不爱喝水" shape="square" style="margin-bottom: 8px;">不爱喝水/积水不化</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </van-cell-group>

        <van-cell-group inset title="8. 大小便情况 (Q34-Q35)" style="margin-top: 16px;">
          <van-field name="stool" label="大便状态" label-align="top">
            <template #input>
              <van-checkbox-group v-model="formData.stoolFeature" direction="horizontal">
                <van-checkbox name="羊粪蛋样干结" shape="square" style="margin-bottom: 8px;">羊粪蛋样干结</van-checkbox>
                <van-checkbox name="恶臭" shape="square" style="margin-bottom: 8px;">极其恶臭</van-checkbox>
                <van-checkbox name="肛门灼热/坠胀" shape="square" style="margin-bottom: 8px;">肛门灼热/坠胀</van-checkbox>
                <van-checkbox name="有便意拉不净" shape="square" style="margin-bottom: 8px;">有便意却拉不净</van-checkbox>
                <van-checkbox name="一痛就泻" shape="square" style="margin-bottom: 8px;">腹痛腹泻(泻后即不痛)</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field v-model="formData.urineFeature" label="小便与夜尿" placeholder="小便是否顺畅？尿道灼热？夜尿几次？" label-align="top" />
        </van-cell-group>

        <van-cell-group inset title="9. 影像资料上传 (Q30, Q36)" style="margin-top: 16px;">
          <van-field name="tongueImg" label="拍摄舌苔照" label-align="top">
            <template #input>
              <van-uploader v-model="formData.tongueImages" :max-count="2" upload-text="拍摄舌象" />
            </template>
          </van-field>
          <van-field name="skinImg" label="皮损/患处照" label-align="top" placeholder="如有长脓包、疮疹或淋巴结肿块请拍摄">
            <template #input>
              <van-uploader v-model="formData.skinImages" :max-count="3" upload-text="拍摄患处" />
            </template>
          </van-field>
        </van-cell-group>

        <div style="margin: 32px 16px; display: flex; gap: 10px;">
          <van-button round block plain type="primary" @click="prevStep">上一步</van-button>
          <van-button round block type="success" native-type="submit">确认提交病历</van-button>
        </div>
      </div>

    </van-form>

    <van-popup v-model:show="showPopup" round position="bottom" style="padding: 20px;">
      <h3 style="margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">标记部位：<span style="color: #ee0a24;">{{ currentRegion }}</span></h3>
      <van-checkbox-group v-model="tempSymptoms" direction="horizontal">
         <van-checkbox name="压痛" shape="square" style="margin: 10px 15px 10px 0;">压痛</van-checkbox>
         <van-checkbox name="肌肉痉挛" shape="square" style="margin: 10px 15px 10px 0;">肌肉痉挛</van-checkbox>
         <van-checkbox name="硬结" shape="square" style="margin: 10px 15px 10px 0;">硬结</van-checkbox>
         <van-checkbox name="硬块" shape="square" style="margin: 10px 15px 10px 0;">硬块</van-checkbox>
      </van-checkbox-group>
      <van-button type="primary" block round style="margin-top: 30px;" @click="saveRegionSymptoms">保存标记</van-button>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { showToast, showLoadingToast, closeToast } from 'vant';

const router = useRouter();
const currentStep = ref(1);

// ================= 读取患者基础信息 =================
const patientProfile = ref({ name: '未登记', age: '', gender: '' });

onMounted(() => {
  const savedPatient = localStorage.getItem('current_patient');
  if (savedPatient) {
    patientProfile.value = JSON.parse(savedPatient);
  } else {
    // 如果没有信息，说明用户是直接敲网址进来的，踢回大门让其登记
    showToast('请先填写基础信息');
    router.push('/');
  }
});

// ================= 终极数据仓库 (完整映射36问) =================
const formData = ref({
  // 步1
  painType: [], painDetail: '', sweatCondition: '', coldHeat: [], fatigue: [],
  // 步2
  headLocation: [], mouthFeeling: [], secretions: '', chestFeeling: [],
  // 步3
  abdomenData: {}, abdomenPainDetail: '',
  // 步4
  digestion: [], stoolFeature: [], urineFeature: '', tongueImages: [], skinImages: []
});

// 步骤切换
const nextStep = () => { if (currentStep.value < 4) { currentStep.value++; window.scrollTo(0, 0); } };
const prevStep = () => { if (currentStep.value > 1) { currentStep.value--; window.scrollTo(0, 0); } };

// 腹诊交互逻辑
const showPopup = ref(false);
const currentRegion = ref('');
const tempSymptoms = ref([]);
const onRegionClick = (regionName) => { currentRegion.value = regionName; tempSymptoms.value = formData.value.abdomenData[regionName] || []; showPopup.value = true; };
const saveRegionSymptoms = () => { formData.value.abdomenData[currentRegion.value] = [...tempSymptoms.value]; showPopup.value = false; };
const getFillColor = (regionName) => { const symptoms = formData.value.abdomenData[regionName]; return (symptoms && symptoms.length > 0) ? 'rgba(238, 10, 36, 0.4)' : 'transparent'; };

// 最终提交
const onSubmit = async () => {
  // 展示一个加载中的提示，防止用户多次点击
  showLoadingToast({
    message: '正在提交病历...',
    forbidClick: true,
    duration: 0, // 持续显示直到手动关闭
  });

  const finalPayload = {
    patient_info: patientProfile.value,
    medical_record: formData.value
  };

  try {
    // 发送 POST 请求到我们的后端地址
    const response = await axios.post('http://localhost:3000/api/submit', finalPayload);

    if (response.data.code === 200) {
      closeToast();
      showToast({
        type: 'success',
        message: '提交成功！医生已收到',
        onClose: () => {
          router.push('/'); // 提交成功后回到首页
        }
      });
    }
  } catch (error) {
    closeToast();
    console.error('提交失败:', error);
    showToast('网络错误，请确保后端服务器已启动');
  }
};
</script>