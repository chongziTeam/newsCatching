var News = require('../model/newsModel');
var scraperjs = require('scraperjs');
exports.getNewsFromZhihus=function(){
  zhihuNews(function(news){ 
    news.forEach(function(n){
      var newsMsg = {
          title:n.news_title,
          img:n.news_img,
          link:n.news_link,
          zhihuId:n.news_id,
      };

        News.find({title:n.news_title})
            .exec()
            .then((doc) =>{
              if(doc.length == 0){
                //console.log('zhihu还未存入数据库')
                News.create(newsMsg);
              }else{
                //console.log('zhihu数据库中已经存在此条记录', doc);
              }
            })
    })
  })
}

function zhihuNews(cb){
  scraperjs.StaticScraper.create('http://daily.zhihu.com/')
    .scrape(function($) {
        return $(".wrap").map(function() {  
              var news_id = $(this).find('.box a').attr('href').split('story/')[1];
              var news_link = 'http://daily.zhihu.com' + $(this).find('.box a').attr('href');      
              return {
                news_title:$(this).find('.box a .title').text(),
                news_img: $(this).find('.box a img').attr('src'),
                news_link: news_link,
                news_id: news_id,
              }     
          }).get();
    })
    .then( (news) => {  
      console.log('zhihunews');   
      cb(news);
      // res.render('zhihu', {news:news});
    })
}
