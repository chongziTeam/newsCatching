var http = require("http"),
 url = require("url"),
 // 使用superagent-charset代替superagent可解决乱码问题
 superagent = require("superagent-charset"),
 cheerio = require("cheerio"),
 async = require("async"),
 eventproxy = require('eventproxy');

var ep = new eventproxy();
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

// 自己整的，，，
var catchFirstUrl = 'http://news.qq.com/',  //入口页面
  deleteRepeat = {},  //去重哈希数组
  urlsArray = [], //存放爬取网址
  catchDate = [], //存放爬取数据
  startDate = new Date(), //开始时间
  endDate = false;  //结束时间
// 获取信息
function personInfo(url) {
  var infoArray = {};
  request(url, function (pres) {
    var $ = cheerio.load(pres.text),
          title = $(".hd h1").text(),
          tag = $(".a_catalog a").text(),
          author = $(".a_author").text(),
          date = $(".a_time").text();

    infoArray.title = title;
    infoArray.tag = tag;
    infoArray.author = author;
    infoArray.date = date;

    catchDate.push(infoArray);
  })
}
// 判断内容是否重复
function isRepeat(titleName){
  if(deleteRepeat[titleName] == undefined){
    deleteRepeat[titleName] = 1;
    return 0;
  }else if(deleteRepeat[titleName] == 1){
    return 1;
  }
}

// 主start程序
function start(){
  function onRequest(req, res){
    // 设置字符编码(去掉中文会乱码)
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    // 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
    ep.after('BlogArticleHtml',20,function(articleUrls){ 
      // 获取 BlogPageUrl 页面内所有文章链接  
      for(var i = 0 ; i < articleUrls.length ; i++){
        res.write(articleUrls[i] +'<br/>');  
      }    
      //控制并发数
      var curCount = 0;
      var reptileMove = function(url,callback){
        //延迟毫秒数
        var delay = parseInt((Math.random() * 30000000) % 1000, 10);
        curCount++;
        console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');  
        
        request(url,function (pres) {
          var $ = cheerio.load(pres.text);
          var title = $('.hd h1').text();
          //收集数据
          var flag = isRepeat(title);
          
          if(!flag){
            personInfo(url);
          }
        })
        setTimeout(function() {
          curCount--;
          callback(null,url +'Call back content');
        }, delay);    
      };

      // 使用async控制异步抓取  
      // mapLimit(arr, limit, iterator, [callback])
      // 异步回调
      async.mapLimit(articleUrls, 5 ,function (url, callback) {
        reptileMove(url, callback);
        }, function (err,result) {
        endDate = new Date();

        var len = catchDate.length,
          aveAge = 0,
          aveFans = 0,
          aveFocus = 0;

        for(var i=0 ; i<len ; i++){
          var eachDate = JSON.stringify(catchDate[i]),
            eachDateJson = catchDate[i];

          // 小几率取不到值则赋默认值 
          eachDateJsonFans = eachDateJson.fans || 110;
          eachDateJsonFocus = eachDateJson.focus || 11;
            
          aveAge += parseInt(eachDateJson.age);
          aveFans += parseInt(eachDateJsonFans);
          aveFocus += parseInt(eachDateJsonFocus);
          res.write(eachDate +'<br/>'); 
        }

        //统计结果
        res.write('1、爬虫开始时间：'+ startDate +'<br/>');
        res.write('2、爬虫结束时间：'+ endDate +'<br/>');
        res.write('3、耗时：'+ (endDate - startDate) +'ms' +' --> '+ (Math.round((endDate - startDate)/1000/60*100)/100) +'min <br/>');
      });
    });

    request(catchFirstUrl,function (pres) {
      var $ = cheerio.load(pres.text);

      var curPageUrls = $('.linkto'),
          curPageImgs = $(".Q-tpWrap .picto");

      for(var i = 0 ; i < curPageUrls.length ; i++){
        var titleImg = {}
        var articleUrl = curPageUrls.eq(i).attr('href'),
            articleTitle = curPageUrls.eq(i).text(),
            articleImg = curPageImgs.eq(i).attr('src');
        
        // if(articleUrl == undefined || articleTitle == undefined || articleImg == undefined) {
        //  continue;
        // }

        titleImg.title = articleTitle;
        titleImg.urls = articleUrl;
        titleImg.imgs = articleImg;
        res.write("7777777"+articleUrl + '<br/>')
        res.write("6666666"+articleTitle + '<br/>')
        res.write("5555555"+articleImg + '<br/>')
        urlsArray.push(titleImg);
        // 相当于一个计数器
        ep.emit('BlogArticleHtml', articleUrl);
      }
    })
  }

  http.createServer(onRequest).listen(3000);
}

exports.start= start;