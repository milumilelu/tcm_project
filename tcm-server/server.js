const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. 基础设置
app.use(cors()); // 允许前端页面（比如你跑在 5173 端口的 Vue）来访问我
app.use(express.json()); // 让服务器能看懂前端发过来的 JSON 数据

// 2. 连接 MongoDB 数据库
// tcm_database 是我们即将创建的数据库名字，如果没有它会自动建一个
mongoose.connect('mongodb://127.0.0.1:27017/tcm_database')
  .then(() => console.log('✅ 数据库连接成功！'))
  .catch(err => console.error('❌ 数据库连接失败：', err));

// 3. 定义数据模型 (Schema)
// 告诉数据库，我们要存的东西大概长什么样
const RecordSchema = new mongoose.Schema({
  patient_info: Object,     // 存患者的姓名年龄性别
  medical_record: Object,   // 存那复杂的 36 问结果
  created_at: { type: Date, default: Date.now } // 自动记录提交时间
});
// 建立一个名为 Record 的集合（相当于一张表）
const Record = mongoose.model('Record', RecordSchema);


// ================= 4. 写接口 (API) =================

// 【接口 A】接收患者提交的问诊单
// 当有前端向 http://localhost:3000/api/submit 发送 POST 请求时，执行这里
app.post('/api/submit', async (req, res) => {
  try {
    // req.body 就是前端传过来的那一坨 JSON 数据
    const newRecord = new Record(req.body); 
    await newRecord.save(); // 一键存入数据库！
    
    res.send({ code: 200, message: '病历保存成功！' });
  } catch (error) {
    res.status(500).send({ code: 500, message: '保存失败' });
  }
});

// 【接口 B】给医生工作台提供病历列表
// 当有前端向 http://localhost:3000/api/records 发送 GET 请求时，执行这里
app.get('/api/records', async (req, res) => {
  try {
    // 从数据库里找出所有记录，并按时间倒序排列（最新的在最上面）
    const records = await Record.find().sort({ created_at: -1 });
    res.send({ code: 200, data: records });
  } catch (error) {
    res.status(500).send({ code: 500, message: '获取失败' });
  }
});

// ====================================================


// 5. 启动服务器！
app.listen(3000, () => {
  console.log('🚀 后端大管家已启动，正在监听 3000 端口...');
  console.log('测试链接: http://localhost:3000/api/records');
});