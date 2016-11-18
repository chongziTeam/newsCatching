var News = require('../model/newsModel');
// var getNewsFromsohu = require('../scraper/sohu').getNewsFromsohu;

exports.newsList = function(req, res){
  // getNewsFromsohu();
  News.find((err, news) =>{
    //console.log('kong', news)
    res.render('index', {news:news})
  })
}