# 新闻信息爬取

使用phantomjs能够模仿浏览器的特性，如加载页面，点击事件等爬取搜狐教育的3页数据列表（通过代码控制），因为目前没有很好地处理使用命令行来爬取数据，现在的爬数据方式是通过- phantomjs sohuScraper.js 来爬，并存在data的一个文件中。（首先确保本地已经安装了phantomjs,并设置它的全局path,这样就能直接使用phantomjs命令).

使用mongodb存放数据，express+ejs展示数据

在router文件中有写一些操作的- api, 如置顶，删除，并按时间排序

### 使用
- 下载phantomjs 并设置它的全局path
- npm install
- gulp server运行
- 进入到scraper目录中 phantomjs sohuScraper.js
- 打开 http://localhost:8080 （第一次可能需要刷新两次，才能看到数据列表，正在紧急处理中...）

###需解决问题

目前是爬数据和存数据需要两步操作，正在寻找解决方案，简化操作

###示例展示
![新闻列表](https://raw.githubusercontent.com/dannisi/newsCatching/screenShots/show.jpg)
