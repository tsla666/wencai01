const FeishuBot = require('./feishuBot');

// 初始化飞书机器人
const bot = new FeishuBot();

// 示例：使用问财选股并发送到飞书
async function runStockSelection() {
  try {
    console.log('开始执行问财选股...');
    
    // 选股查询语句
    const query = '2026年预测营收增速大于20%或预测净利润增速大于30%，股价创半年新高';
    
    // 调用选股并发送到飞书
    const result = await bot.sendStockSelection(query);
    
    console.log('选股结果已发送到飞书:', result);
  } catch (error) {
    console.error('执行选股失败:', error);
  }
}

// 运行示例
runStockSelection();
