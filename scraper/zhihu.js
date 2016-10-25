var News = require('../model/newsModel');
var scraperjs = require('scraperjs');
exports.getNewsFromZhihu=function(req, res){
  zhihuNews((news) =>{
    news.forEach((_new) =>{
      News.findOneAndUpdate({
        title:_new.news_title
      }, {
        $set:{
          title:_new.news_title,
          img:_new.news_img,
          link:_new.news_link,
          zhihuId:_new.news_id
        }
      }, {
         new:true,
         upset:true
      }, (err, _new)=>{
        console.log(_new);
      })
    })
  })
}

function zhihuNews(cb){
  scraperjs.StaticScraper.create('http://daily.zhihu.com/')
    .scrape(function($) {
        return $(".wrap").map(function() {  
              var news_id = $('.box a').attr('href').split('story/')[1];
              var news_link = 'http://daily.zhihu.com' + $('.box a').attr('href');      
              return {
                news_title:$(this).find('.box a .title').text(),
                news_img: $(this).find('.box a img').attr('src'),
                news_link: news_link,
                news_id: news_id
              }     
          }).get();
    })
    .then( (news) => {     
      // console.log(news.length);
      return cb(news);
    })
}
