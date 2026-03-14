const schedule = require('node-schedule');
const FeishuBot = require('./feishuBot');

// 初始化飞书机器人
const bot = new FeishuBot();

// 选股查询语句
const query = '2026年预测营收增速大于20%或预测净利润增速大于30%，股价创半年新高';

// 发送选股结果的函数
async function sendStockSelection() {
  try {
    console.log(`[${new Date().toLocaleString()}] 开始执行定时选股任务...`);
    const result = await bot.sendStockSelection(query);
    console.log(`[${new Date().toLocaleString()}] 定时选股任务执行完成:`, result);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] 定时选股任务执行失败:`, error);
  }
}

// 设置定时任务
// 每天11:00执行
const job11 = schedule.scheduleJob('0 0 11 * * 1-5', sendStockSelection);
// 每天13:00执行
const job13 = schedule.scheduleJob('0 0 13 * * 1-5', sendStockSelection);
// 每天14:00执行
const job14 = schedule.scheduleJob('0 0 14 * * 1-5', sendStockSelection);

console.log('定时任务已设置:');
console.log('1. 每个交易日 11:00');
console.log('2. 每个交易日 13:00');
console.log('3. 每个交易日 14:00');
console.log('按 Ctrl+C 停止定时任务');

// 立即执行一次，测试定时任务
console.log('\n立即执行一次选股任务，测试配置是否正确...');
sendStockSelection();
