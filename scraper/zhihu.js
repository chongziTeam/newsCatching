var News = require('../model/newsModel');
var scraperjs = require('scraperjs');
// exports.getNewsFromZhihu=function(){
//   zhihuNews((news) =>{
//     news.forEach((n) =>{
//       News.findOneAndUpdate({
//         title:n.news_title
//       }, {
//         $set:{
//           title:n.news_title,
//           img:n.news_img,
//           link:n.news_link,
//           zhihuId:n.news_id
//         }
//       }, {
//          new:true,
//          upset:true
//       }, (err, n)=>{
//         console.log(n);
//       })
//     })
//   })
// }

exports.getNewsFromZhihu=function(req, res){
  scraperjs.StaticScraper.create('http://daily.zhihu.com/')
    .scrape(function($) {
        return $(".wrap").map(function() {  
              var news_id = $(this).find('.box a').attr('href').split('story/')[1];
              var news_link = 'http://daily.zhihu.com' + $(this).find('.box a').attr('href');      
              return {
                news_title:$(this).find('.box a .title').text(),
                news_img: $(this).find('.box a img').attr('src'),
                news_link: news_link,
                news_id: news_id
              }     
          }).get();
    })
    .then( (news) => {  
      console.log(news)   
      res.render('zhihu', {news:news})
    })
}
