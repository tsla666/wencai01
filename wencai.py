import pywencai
import json
import sys

# 选股函数
def select_stocks(query, cookie):
    try:
        # 调用问财API获取数据
        result = pywencai.get(
            query=query,
            cookie=cookie,
            loop=True,  # 循环获取所有页数据
            log=True,  # 打印日志
            sort_key='最新涨跌幅',  # 按涨幅排序
            sort_order='desc'  # 降序排列
        )
        
        # 检查结果类型
        if result is None:
            # 如果结果为None
            return {
                "type": "error",
                "message": "查询结果为空"
            }
        elif isinstance(result, dict):
            # 如果是详情类结果
            return {
                "type": "detail",
                "data": result
            }
        else:
            # 如果是DataFrame结果，转换为字典列表
            try:
                stocks = []
                for index, row in result.iterrows():
                    stock = {}
                    for col in result.columns:
                        stock[col] = str(row[col])
                    stocks.append(stock)
                
                return {
                    "type": "list",
                    "data": stocks,
                    "count": len(stocks)
                }
            except Exception as e:
                return {
                    "type": "error",
                    "message": f"处理结果失败: {str(e)}"
                }
    except Exception as e:
        return {
            "type": "error",
            "message": str(e)
        }

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"type": "error", "message": "参数不足，需要查询语句和cookie"}))
        sys.exit(1)
    
    query = sys.argv[1]
    cookie = sys.argv[2]
    
    result = select_stocks(query, cookie)
    print(json.dumps(result, ensure_ascii=False))
