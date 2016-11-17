var News = require('../model/newsModel');
var getNewsFromsohu = require('../scraper/sohu').getNewsFromsohu;

exports.newsList = function(req, res){
  // getNewsFromZhihus();
  getNewsFromsohu();
  //getNewsFromToutiao();
  News.find({}, (err, news) =>{
    res.render('index', {news:news})
  })
}