var express = require('express');
var path = require('path'); 
var mongoose = require('mongoose');
var dbConnection = 'mongodb://localhost/news';
mongoose.connect(dbConnection);
var port = process.env.PORT || 8080;
var app = express();
app.listen(port, function(){
    console.log(`Express server listening on port ${port}`);
});
// =======
// var http = require("http"),
//  url = require("url"),
//  // 使用superagent-charset代替superagent可解决乱码问题
//  superagent = require("superagent-charset"),
//  cheerio = require("cheerio"),
//  async = require("async"),
//  eventproxy = require('eventproxy');

// var ep = new eventproxy();
// 这是他项目用的
/*var catchFirstUrl = 'http://www.cnblogs.com/',	//入口页面
	deleteRepeat = {},	//去重哈希数组
	urlsArray = [],	//存放爬取网址
	catchDate = [],	//存放爬取数据
	pageUrls = [],	//存放收集文章页面网站
	pageNum = 200,	//要爬取文章的页数
	startDate = new Date(),	//开始时间
	endDate = false;	//结束时间

for(var i=1 ; i<= pageNum ; i++){
	pageUrls.push('http://www.cnblogs.com/?CategoryId=808&CategoryType=%22SiteHome%22&ItemListActionName=%22PostList%22&PageIndex='+ i +'&ParentCategoryId=0');
}

// 抓取昵称、入园年龄、粉丝数、关注数
function personInfo(url){
	var infoArray = {};
	superagent.get(url)
		.end(function(err,ares){
				if (err) {
		      console.log(err);
		      return;
		    }

		    var $ = cheerio.load(ares.text),
				info = $('#profile_block a'),
  	  	len = info.length,
  	  	age = "",
  	  	flag = false,
  	  	curDate = new Date();

  	  // 小概率异常抛错	
  	  try{
  	  	age = "20"+(info.eq(1).attr('title').split('20')[1]);
  	  }
  	  catch(err){
  	  	console.log(err);
  	  	age = "2012-11-06";
  	  }	

    	infoArray.name = info.eq(0).text();
    	infoArray.age = parseInt((new Date() - new Date(age))/1000/60/60/24);
	    
	    if(len == 4){
	 	    infoArray.fans = info.eq(2).text();
	    	infoArray.focus = info.eq(3).text();	
	    }else if(len == 5){// 博客园推荐博客
	 	    infoArray.fans = info.eq(3).text();
	    	infoArray.focus = info.eq(4).text();	
	    }
	    //console.log('用户信息:'+JSON.stringify(infoArray));
	    catchDate.push(infoArray);
	});
}

// 判断作者是否重复
function isRepeat(authorName){
	if(deleteRepeat[authorName] == undefined){
		deleteRepeat[authorName] = 1;
		return 0;
	}else if(deleteRepeat[authorName] == 1){
		return 1;
	}
}

// 主start程序
function start(){
	function onRequest(req, res){
		// 设置字符编码(去掉中文会乱码)
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		// 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
		ep.after('BlogArticleHtml',20,function(articleUrls){
			res.write(urlsArray.length +'<br/>')
			// 获取 BlogPageUrl 页面内所有文章链接
			for(var i = 0 ; i < articleUrls.length ; i++){
      	res.write(articleUrls[i] +'<br/>');  
      }    
     	console.log('articleUrls.length is'+ articleUrls.length +',content is :'+articleUrls);

     	//控制并发数
     	var curCount = 0;
     	var reptileMove = function(url,callback){
     		//延迟毫秒数
     		var delay = parseInt((Math.random() * 30000000) % 1000, 10);
			  curCount++;
			  console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');  
		  	
		  	superagent.get(url)
		  		.end(function(err,sres){
			  		// 常规的错误处理
			      if (err) {
			        console.log(err);
			        return;
			      }		  	

			      //sres.text 里面存储着请求返回的 html 内容
			      var $ = cheerio.load(sres.text);
			      //收集数据
			      //1、收集用户个人信息，昵称、园龄、粉丝、关注
						//var currentBlogApp = $('script').eq(1).text().split(',')[0].split('=')[1].trim().replace(/'/g,""),
						var currentBlogApp = url.split('/p/')[0].split('/')[3],	
							requestId = url.split('/p/')[1].split('.')[0];

						// res.write('currentBlogApp is '+ currentBlogApp + ' , ' + 'requestId id is ' + requestId +'<br/>'); 
						// console.log('currentBlogApp is '+ currentBlogApp + '\n' + 'requestId id is ' + requestId); 

						// res.write('the article title is :'+$('title').text() +'<br/>');

						var flag = 	isRepeat(currentBlogApp);
						
						if(!flag){
							var appUrl = "http://www.cnblogs.com/mvc/blog/news.aspx?blogApp="+ currentBlogApp;
							personInfo(appUrl);
						}
		  		});

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

			  console.log('final:');
			  console.log(result);
			  console.log(catchDate);
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
			  	// res.write(eachDate +'<br/>'); 
			  }

			  //统计结果
			  // res.write('1、爬虫开始时间：'+ startDate +'<br/>');
			  // res.write('2、爬虫结束时间：'+ endDate +'<br/>');
			  // res.write('3、耗时：'+ (endDate - startDate) +'ms' +' --> '+ (Math.round((endDate - startDate)/1000/60*100)/100) +'min <br/>');
			  // res.write('4、爬虫遍历的文章数目：'+ pageNum*20 +'<br/>');
			  // res.write('5、作者人数：'+ len +'<br/>');
			  // res.write('6、作者入园平均天数：'+ Math.round(aveAge/len*100)/100 +'<br/>');
			  // res.write('7、作者人均粉丝数：'+ Math.round(aveFans/len*100)/100 +'<br/>');
			  // res.write('8、作者人均关注数：'+ Math.round(aveFocus/len*100)/100 +'<br/>');
			});
		});
		var pageURls = 'http://www.cnblogs.com/?CategoryId=808&CategoryType=%22SiteHome%22&ItemListActionName=%22PostList%22&PageIndex=1&ParentCategoryId=0'
		// 轮询 所有文章列表页
		// pageUrls.forEach(function(pageUrl){
			superagent.get(pageURls)
				.end(function(err,pres){
					console.log('fetch ' + pageURls + ' successful');
					res.write('fetch ' + pageURls + ' successful<br/>');
					// 常规的错误处理
		      if (err) {
		        console.log(err);
		   		}
		      // pres.text 里面存储着请求返回的 html 内容，将它传给 cheerio.load 之后
		      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
		      // 剩下就都是 jquery 的内容了
		      var $ = cheerio.load(pres.text);
		      var curPageUrls = $('.titlelnk');
		      // res.write('fetch ' + curPageUrls + ' successful<br/>');
		      for(var i = 0 ; i < curPageUrls.length ; i++){
		      	var articleUrl = curPageUrls.eq(i).attr('href');
		      	urlsArray.push(articleUrl);
		      	// 相当于一个计数器
		      	ep.emit('BlogArticleHtml', articleUrl);
		      }
			})
		// })
	}

	http.createServer(onRequest).listen(3000);
}

exports.start= start;*/



// function request(url, callBack) {
// 	superagent.get(url)
// 		.charset('gbk')
// 		.end(function (err, pres) {
// 			if (err) {
// 	      console.log(err);
// 	      return;
// 	    }

// 			callBack(pres);
// 		})
// }

// // 自己整的，，，
// var catchFirstUrl = 'http://news.qq.com/',	//入口页面
// 	deleteRepeat = {},	//去重哈希数组
// 	urlsArray = [],	//存放爬取网址
// 	catchDate = [],	//存放爬取数据
// 	startDate = new Date(),	//开始时间
// 	endDate = false;	//结束时间
// // 获取信息
// function personInfo(url) {
// 	var infoArray = {};
// 	request(url, function (pres) {
// 		var $ = cheerio.load(pres.text),
// 	    		title = $(".hd h1").text(),
// 	    		tag = $(".a_catalog a").text(),
// 	    		author = $(".a_author").text(),
// 	    		date = $(".a_time").text();

//     infoArray.title = title;
//     infoArray.tag = tag;
//     infoArray.author = author;
//     infoArray.date = date;

//     catchDate.push(infoArray);
// 	})
// }
// // 判断内容是否重复
// function isRepeat(titleName){
// 	if(deleteRepeat[titleName] == undefined){
// 		deleteRepeat[titleName] = 1;
// 		return 0;
// 	}else if(deleteRepeat[titleName] == 1){
// 		return 1;
// 	}
// }

// // 主start程序
// function start(){
// 	function onRequest(req, res){
// 		// 设置字符编码(去掉中文会乱码)
// 		res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
// 		// 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
// 		ep.after('BlogArticleHtml',20,function(articleUrls){ 
// 			// 获取 BlogPageUrl 页面内所有文章链接  
// 			for(var i = 0 ; i < articleUrls.length ; i++){
//       	res.write(articleUrls[i] +'<br/>');  
//       }    
//      	//控制并发数
//      	var curCount = 0;
//      	var reptileMove = function(url,callback){
//      		//延迟毫秒数
//      		var delay = parseInt((Math.random() * 30000000) % 1000, 10);
// 			  curCount++;
// 			  console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');  
		  	
// 		  	request(url,function (pres) {
// 		  		var $ = cheerio.load(pres.text);
// 		      var title = $('.hd h1').text();
// 		      //收集数据
// 					var flag = isRepeat(title);
					
// 					if(!flag){
// 						personInfo(url);
// 					}
// 		  	})
// 		  	setTimeout(function() {
// 			    curCount--;
// 			    callback(null,url +'Call back content');
// 			  }, delay);		
//      	};

// 	    // 使用async控制异步抓取 	
// 	    // mapLimit(arr, limit, iterator, [callback])
// 	    // 异步回调
//       async.mapLimit(articleUrls, 5 ,function (url, callback) {
// 			  reptileMove(url, callback);
// 				}, function (err,result) {
// 				endDate = new Date();

// 			  var len = catchDate.length,
// 			  	aveAge = 0,
// 			  	aveFans = 0,
// 			  	aveFocus = 0;

// 			  for(var i=0 ; i<len ; i++){
// 			  	var eachDate = JSON.stringify(catchDate[i]),
// 			  		eachDateJson = catchDate[i];

// 			  	// 小几率取不到值则赋默认值	
// 			  	eachDateJsonFans = eachDateJson.fans || 110;
// 			  	eachDateJsonFocus = eachDateJson.focus || 11;
			  		
// 			  	aveAge += parseInt(eachDateJson.age);
// 			  	aveFans += parseInt(eachDateJsonFans);
// 			  	aveFocus += parseInt(eachDateJsonFocus);
// 			  	res.write(eachDate +'<br/>'); 
// 			  }

// 			  //统计结果
// 			  res.write('1、爬虫开始时间：'+ startDate +'<br/>');
// 			  res.write('2、爬虫结束时间：'+ endDate +'<br/>');
// 			  res.write('3、耗时：'+ (endDate - startDate) +'ms' +' --> '+ (Math.round((endDate - startDate)/1000/60*100)/100) +'min <br/>');
// 			});
// 		});

// 		request(catchFirstUrl,function (pres) {
// 			var $ = cheerio.load(pres.text);

//       var curPageUrls = $('.linkto'),
//       		curPageImgs = $(".Q-tpWrap .picto");

//       for(var i = 0 ; i < curPageUrls.length ; i++){
//       	var titleImg = {}
//       	var articleUrl = curPageUrls.eq(i).attr('href'),
//       			articleTitle = curPageUrls.eq(i).text(),
//       			articleImg = curPageImgs.eq(i).attr('src');
      	
//       	// if(articleUrl == undefined || articleTitle == undefined || articleImg == undefined) {
//       	// 	continue;
//       	// }

//       	titleImg.title = articleTitle;
//       	titleImg.urls = articleUrl;
//       	titleImg.imgs = articleImg;
//       	res.write("7777777"+articleUrl + '<br/>')
//       	res.write("6666666"+articleTitle + '<br/>')
//       	res.write("5555555"+articleImg + '<br/>')
//       	urlsArray.push(titleImg);
//       	// 相当于一个计数器
//       	ep.emit('BlogArticleHtml', articleUrl);
//       }
// 		})
// 	}

// 	http.createServer(onRequest).listen(3000);
// }

// exports.start= start;
























