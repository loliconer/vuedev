# share-doc

## 生产服务器上配置每天23:00备份数据库和每月1号1:00删除上个月的所有备份的定时任务

dbDailyBackup.sh
```bash
#! /bin/bash
cp ~/shareDoc/server/doc.db ~/backup/shareDoc/doc-$(date +%Y%m%d%H%M%S).db
```

deleteLastMonthBackup.sh
```bash
#! /bin/bash
cd ~/backup/shareDoc
lastMonth=$(date +%Y%m -d '1 month ago')
rm doc-${lastMonth}*.db
```

> crontab -e
00 23 * * * /home/rss/backup/shareDoc/dbDailyBackup.sh
00 01 1 * * /home/rss/backup/shareDoc/deleteLastMonthBackup.sh

## 开发
npm run serve

## 部署
npm run build
sh deploy.sh

## 已开发功能
- 注册
- 登录
- 退出登录
- 获取博客列表
- 新建博客
- 编辑博客
- 删除博客
- 查看单篇博客
- 博客评论
- 邮箱验证
- 修改密码
- 手机绑定
- 个人中心
- 个人资料
- 重置密码
- 用户权限
- 后台管理
- 多级目录

## 待开发功能
- 第三方登录
- 标签管理
