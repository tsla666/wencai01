// 飞书机器人配置
module.exports = {
  // 飞书机器人webhook地址
  webhook: process.env.FEISHU_WEBHOOK || 'https://open.feishu.cn/open-apis/bot/v2/hook/4f9a2a04-f553-448c-bd80-8b5d01ebf207',
  // 飞书应用配置（如果使用应用机器人）
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
  // 飞书机器人名称
  botName: '智能助手',
  // 消息类型配置
  messageTypes: {
    text: 'text',
    post: 'post',
    image: 'image',
    share_chat: 'share_chat',
    interactive: 'interactive'
  },
  // 问财配置
  wencai: {
    // 问财cookie，需要替换为实际的cookie
    cookie: process.env.WENCAI_COOKIE || 'yochat_bot_session_id=e1e961d4c549535a9ba2480b94a39a00; cid=0dd991b5bde2cfe74c4a75c1cfc1727b1747064580; other_uid=Ths_iwencai_Xuangu_238qw6tfu7q974h4gfx1r0016dyyqmae; ta_random_userid=f74d26lrt4; u_ukey=A10702B8689642C6BE607730E11E6E4A; u_uver=1.0.0; u_dpass=xYZ1oqjE6O3XX2DjKJKga5lpfkx%2Fwp0sBhGd6v%2F%2Fvx7%2B4nCNNoUzNDpoDZMKlssRHi80LrSsTFH9a%2B6rtRvqGg%3D%3D; u_did=2AD42E25F6B64DCA8B37912FCEB78A67; u_ttype=WEB; user=MDp0c2xhNjY2OjpOb25lOjUwMDo0NjE1MDAzNDE6NywxMTExMTExMTExMSw0MDs0NCwxMSw0MDs2LDEsNDA7NSwxLDQwOzEsMTAxLDQwOzIsMSw0MDszLDEsNDA7NSwxLDQwOzgsMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEsNDA7MTAyLDEsNDA6Mjc6Ojo0NTE1MDAzNDE6MTc3Mjc4NzgyNTo6OjE1Mjc5NDE0MDA6MjY3ODQwMDowOjFjYmJmYWIwNjRjNTc0ZTg2NmNhYTZiNGEzZTEwNzUyMjpkZWZhdWx0XzU6MA%3D%3D; userid=451500341; u_name=tsla666; escapename=tsla666; ticket=f4e4bfcc0f4a3ea3bb879ae452be0be2; user_status=0; utk=3f12a1448afa7d5468c0477cea0b246e; sess_tk=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6InNlc3NfdGtfMSIsImJ0eSI6InNlc3NfdGsifQ.eyJqdGkiOiIyMjc1MTAzZTRhNmJhYTZjODY0ZTU3NGMwNmFiYmZjYjEiLCJpYXQiOjE3NzI3ODc4MjUsImV4cCI6MTc3NTQ2NjIyNSwic3ViIjoiNDUxNTAwMzQxIiwiaXNzIjoidXBhc3MuaXdlbmNhaS5jb20iLCJhdWQiOiIyMDIwMTExODUyODg5MDcyIiwiYWN0Ijoib2ZjIiwiY3VocyI6Ijg1MGZlYTJiNWI4ZWVhMzk1ZGM3NWYzYzczZWMxY2Q0NWYzODc0MTlmYjUxZmNmNzA0YWU2YWJiNDhjOTkyMDcifQ.rPiJeoGzobJ_m8cr8L-oW8QViTe-1hvbfUdK3LCIZy3kv2iiKercLQxNee1KzCWANN7Hk_3SfQBbk8utm5lbVA; cuc=i70c3qbhm03r; THSSESSID=e5886ed49c8689b6a96159299a; _clck=44tvj0%7C2%7Cg4c%7C0%7C0; _clsk=evajt8ido9q6%7C1773470867224%7C6%7C1%7C; v=A3gDqOLqZW7vBYnqZj3_EYfRTy0P4dxrPkWw77LpxLNmzRITWvGs-45VgHwB',
    // 虚拟环境路径（GitHub Actions使用系统Python）
    venvPath: process.env.PYTHON_PATH || 'python3'
  }
};
