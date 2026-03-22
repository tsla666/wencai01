const axios = require('axios');
const { Client } = require('@larksuiteoapi/node-sdk');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class FeishuBot {
  constructor() {
    // 使用环境变量
    this.webhook = process.env.FEISHU_WEBHOOK || 'https://open.feishu.cn/open-apis/bot/v2/hook/4f9a2a04-f553-448c-bd80-8b5d01ebf207';
    this.appId = process.env.FEISHU_APP_ID || '';
    this.appSecret = process.env.FEISHU_APP_SECRET || '';
    this.wencaiCookie = process.env.WENCAI_COOKIE || '';
    
    // 初始化飞书客户端（如果使用应用机器人）
    if (this.appId && this.appSecret) {
      this.client = new Client({
        appId: this.appId,
        appSecret: this.appSecret,
        // 更多配置请参考飞书开发文档
        disableTokenCache: false
      });
    }
  }

  /**
   * 发送文本消息
   * @param {string} content - 消息内容
   * @param {object} options - 其他选项
   * @returns {Promise} - 发送结果
   */
  async sendText(content, options = {}) {
    const message = {
      msg_type: 'text',
      content: {
        text: content
      },
      ...options
    };
    return this.send(message);
  }

  /**
   * 发送富文本消息
   * @param {object} post - 富文本内容
   * @param {object} options - 其他选项
   * @returns {Promise} - 发送结果
   */
  async sendPost(post, options = {}) {
    const message = {
      msg_type: 'post',
      content: {
        post: post
      },
      ...options
    };
    return this.send(message);
  }

  /**
   * 发送图片消息
   * @param {string} imageKey - 图片key
   * @param {object} options - 其他选项
   * @returns {Promise} - 发送结果
   */
  async sendImage(imageKey, options = {}) {
    const message = {
      msg_type: 'image',
      content: {
        image_key: imageKey
      },
      ...options
    };
    return this.send(message);
  }

  /**
   * 发送卡片消息
   * @param {object} card - 卡片内容
   * @param {object} options - 其他选项
   * @returns {Promise} - 发送结果
   */
  async sendCard(card, options = {}) {
    const message = {
      msg_type: 'interactive',
      content: {
        card: card
      },
      ...options
    };
    return this.send(message);
  }

  /**
   * 通用发送方法
   * @param {object} message - 消息对象
   * @returns {Promise} - 发送结果
   */
  async send(message) {
    try {
      // 使用webhook发送消息
      const response = await axios.post(this.webhook, message);
      return response.data;
    } catch (error) {
      console.error('发送消息失败:', error.message);
      throw error;
    }
  }

  /**
   * 生成富文本消息格式
   * @param {string} title - 标题
   * @param {array} content - 内容数组
   * @returns {object} - 富文本消息对象
   */
  createPost(title, content) {
    return {
      zh_cn: {
        title: title,
        content: content
      }
    };
  }

  /**
   * 生成卡片消息格式
   * @param {object} elements - 卡片元素
   * @returns {object} - 卡片消息对象
   */
  createCard(elements) {
    return {
      elements: elements
    };
  }

  /**
   * 调用问财选股
   * @param {string} query - 选股查询语句
   * @returns {Promise} - 选股结果
   */
  async selectStocks(query) {
    try {
      const wencaiPath = path.join(__dirname, 'wencai.py');
      const pythonPath = process.env.PYTHON_PATH || 'python3'; // 使用系统Python
      const cookie = this.wencaiCookie;
      
      // 执行Python脚本
      const command = `${pythonPath} ${wencaiPath} "${query}" "${cookie}"`;
      const output = execSync(command, { encoding: 'utf8' });
      
      // 解析结果
      const result = JSON.parse(output);
      return result;
    } catch (error) {
      console.error('问财选股失败:', error.message);
      throw error;
    }
  }

  /**
   * 发送选股结果到飞书
   * @param {string} query - 选股查询语句
   * @returns {Promise} - 发送结果
   */
  async sendStockSelection(query) {
    try {
      // 调用问财选股
      const result = await this.selectStocks(query);
      
      // 检查结果是否有效
      if (!result) {
        return this.sendText(`选股失败: 未获取到结果`);
      }
      
      if (result.type === 'error') {
        // 发送错误消息
        return this.sendText(`选股失败: ${result.message || '未知错误'}`);
      } else if (result.type === 'list') {
        // 处理列表结果
        const stocks = result.data || [];
        const count = result.count || 0;
        
        // 生成消息内容
        let content = `【选股结果】\n查询语句: ${query}\n共找到 ${count} 只股票\n\n`;
        
        if (stocks.length === 0) {
          content += '未找到符合条件的股票';
        } else {
          // 打印第一只股票的完整信息，用于调试
          console.log('第一只股票的完整信息:', stocks[0]);
          
          // 数字格式化函数，保留两位小数
          function formatNumber(num) {
            if (typeof num === 'string' && !isNaN(parseFloat(num))) {
              return parseFloat(num).toFixed(2);
            }
            return num;
          }
          
          // 按涨幅降序排序
          stocks.sort((a, b) => {
            const changeA = parseFloat(a['最新涨跌幅']) || 0;
            const changeB = parseFloat(b['最新涨跌幅']) || 0;
            return changeB - changeA; // 降序
          });
          
          // 只显示前20只股票
          const displayStocks = stocks.slice(0, 20);
          displayStocks.forEach((stock, index) => {
            // 提取关键信息，使用正确的字段名
            const name = stock['股票简称'] || stock['股票名称'] || '未知';
            const code = stock['股票代码'] || '未知';
            const price = formatNumber(stock['最新价'] || '未知');
            const change = formatNumber(stock['最新涨跌幅'] || '未知');
            const revenueGrowth = formatNumber(stock['预测主营业务收入增长率[20261231]'] || '未知');
            const profitGrowth = formatNumber(stock['预测净利润增长率[20261231]'] || '未知');
            const pe = formatNumber(stock['预测市盈率(pe,最新预测)[20261231]'] || '未知');
            const peg = formatNumber(stock['预测peg值[20261231]'] || '未知');
            
            content += `${index + 1}. ${name} (${code})\n`;
            content += `   价格: ${price} | 涨跌幅: ${change}%\n`;
            content += `   营收增速: ${revenueGrowth}% | 净利润增速: ${profitGrowth}%\n`;
            content += `   预测PE: ${pe} | 预测PEG: ${peg}\n\n`;
          });
          
          if (count > 10) {
            content += `\n... 还有 ${count - 10} 只股票未显示`;
          }
        }
        
        // 发送消息
        return this.sendText(content);
      } else {
        // 处理详情结果
        return this.sendText(`查询结果: ${JSON.stringify(result.data || {})}`);
      }
    } catch (error) {
      console.error('发送选股结果失败:', error.message);
      return this.sendText(`发送选股结果失败: ${error.message}`);
    }
  }
}

module.exports = FeishuBot;
