var News = require('../model/newsModel');
var scraperjs = require('scraperjs');
var fs = require('fs');
var stream = require('stream');
const path = './data/sohu.txt';
// exports.getNewsFromsohu=function(){
//   sohuNews(function(news){
//     news.forEach(function(n){
//       var newsMsg = {
//           title:n.news_title,
//           img:n.news_img,
//           link:n.news_link,
//           sohuId:n.news_id,
//           typeTag:n.news_tag,
//       }
   
//     News.find({title:n.news_title})
//         .exec()
//         .then((doc)=>{
//           if(doc.length == 0){
//             // console.log('sohunews不存在')
//             News.create(newsMsg);
//           }else{
//             // console.log('sohunews已存在')
//           }
//         })
//     })
//   })
// }

// function sohuNews(cb){
//   scraperjs.StaticScraper.create('http://learning.sohu.com/xiaoxueedu/index.shtml')
//     .scrape(function($) {
//         return $(".list-box li").map(function() {  
//               var news_link = $(this).find('.published h3 .content-title a').attr('href'); 
//               var news_id = news_link.split('/')[4].split('.')[0];
//               var news_title = $(this).find('.published h3 .content-title a').text(); 
//               var bufs = new Buffer(news_title);
//               // news_title = buf.toString(); 
//               var buf = iconv.decode(bufs, 'utf-8')
//               console.log('kkkk', buf);
//               return {
//                 news_title: buf,
//                 news_img: $(this).find('.published .content-pic a img').attr('src'),
//                 news_link: news_link,
//                 news_id: news_id,
//                 news_tag: $(this).find('.introduction .img-name .per-name').text(),
//               }     
//           }).get();
//     })
//     .then( (news) => {  
//       console.log('sohuNews')   
//       cb(news);
//       // res.render('sohu', {news:news});
//     })
// }


