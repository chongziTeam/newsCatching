var News = require('../model/newsModel');

var http = require("http"),
    url = require("url"),
    // 使用superagent-charset代替superagent可解决乱码问题
    superagent = require("superagent-charset"),
    cheerio = require("cheerio"),
    async = require("async"),
    eventproxy = require('eventproxy');

var ep = new eventproxy();

var catchFirstUrl = 'http://news.qq.com/',  //入口页面
    deleteRepeat = {},  //去重哈希数组
    catchDate = [];

function request(url, callBack) {
  superagent.get(url)
    .charset('gbk')
    .end(function (err, pres) {
      if (err) {
        console.log(err);
        return;
      }

      callBack(pres);
    })
}

function start(callBack){
  request(catchFirstUrl,function (pres) {
    var $ = cheerio.load(pres.text);

      var curPages = $(".Q-tpWrap");

    for(var i = 0; i < curPages.length; i++){
      var obj = {}
      var articleUrl = curPages.eq(i).find($('.linkto')).attr('href'),
          articleTitle = curPages.eq(i).find($('.linkto')).text(),
          articleImg = curPages.eq(i).find($('.picto')).attr('src');
        
      if (articleUrl == undefined || articleTitle == undefined || articleImg == undefined) {
        continue;
      }
      var articleIds = articleUrl.split('/'),
          atrcleId = articleIds[articleIds.length - 1].split(".")[0];

      obj = {
        newsTitle: articleTitle,
        newsImg: articleImg,
        newsUrl: articleUrl,
        newsId: atrcleId,
      };

      catchDate.push(obj);
      callBack(catchDate);
    }
    console.log(catchDate);
  })
}

function tengxunNews(req, res) {
  start(function (catchDate) {
    catchDate.map(function (item, index) {
      var dbObj = {
        title:item.newsTitle,
        img:item.newsImg,
        link:item.newsUrl,
        tengxunId: item.newsId,
      }
      News.create(dbObj);
    });
  })
}

exports.tengxunNews = tengxunNews; 























