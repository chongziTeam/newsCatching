# 新闻信息爬取

使用phantomjs能够模仿浏览器的特性，如加载页面，点击事件等爬取搜狐教育的3页数据列表（通过代码控制），（首先确保本地已经安装了phantomjs,并设置它的全局path,这样就能直接使用phantomjs命令).

使用mongodb存放数据，express+ejs展示数据

在router文件中有写一些操作的- api, 如置顶，删除，并按时间排序

### 使用
-- 下载phantomjs 并设置它的全局path
- npm install
- gulp server运行(可检测文件改变，无需重新启动)
- npm run build 开启爬虫爬取数据(或者下面这种方式)
- 进入到scraper目录中 phantomjs sohuScraper.js
- 在地址栏输入 http://localhost:8080/getsohunews 执行存库操作
- 打开 http://localhost:8080 （显示结果）

###需解决问题

目前是爬数据和存数据需要两步操作，正在寻找解决方案，简化操作

###示例展示
![新闻列表](https://github.com/chongziTeam/newsCatching/blob/master/screenShots/show.jpg)
