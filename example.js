const FeishuBot = require('./feishuBot');

// 初始化飞书机器人
const bot = new FeishuBot();

// 示例：发送文本消息
async function sendTextMessage() {
  try {
    const result = await bot.sendText('Hello, 这是一条测试消息！');
    console.log('发送文本消息成功:', result);
  } catch (error) {
    console.error('发送文本消息失败:', error);
  }
}

// 示例：发送富文本消息
async function sendPostMessage() {
  try {
    const post = bot.createPost('测试富文本消息', [
      [
        {
          tag: 'text',
          text: '这是第一段文字\n'
        },
        {
          tag: 'a',
          text: '这是一个链接',
          href: 'https://www.example.com'
        }
      ],
      [
        {
          tag: 'img',
          image_key: 'img_v3_00q5_1234567890abcdefg'
        }
      ]
    ]);
    const result = await bot.sendPost(post);
    console.log('发送富文本消息成功:', result);
  } catch (error) {
    console.error('发送富文本消息失败:', error);
  }
}

// 示例：发送卡片消息
async function sendCardMessage() {
  try {
    const card = bot.createCard([
      {
        tag: 'div',
        text: {
          content: '这是一个卡片消息',
          tag: 'lark_md'
        }
      },
      {
        tag: 'hr'
      },
      {
        tag: 'div',
        text: {
          content: '卡片消息支持多种元素',
          tag: 'lark_md'
        }
      },
      {
        tag: 'action',
        actions: [
          {
            tag: 'button',
            text: {
              content: '点击按钮',
              tag: 'lark_md'
            },
            type: 'primary',
            url: 'https://www.example.com'
          }
        ]
      }
    ]);
    const result = await bot.sendCard(card);
    console.log('发送卡片消息成功:', result);
  } catch (error) {
    console.error('发送卡片消息失败:', error);
  }
}

// 运行示例
async function runExamples() {
  console.log('开始发送测试消息...');
  await sendTextMessage();
  // await sendPostMessage();
  // await sendCardMessage();
  console.log('测试消息发送完成！');
}

runExamples();
