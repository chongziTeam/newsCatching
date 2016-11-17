var News = require('../model/newsModel');
var getNewsFromZhihus = require('../scraper/zhihu').getNewsFromZhihus;
var getNewsFromsohu = require('../scraper/sohu').getNewsFromsohu;
//var getNewsFromToutiao = require('../scraper/toutiao').testPhantom;

exports.newsList = function(req, res){
  getNewsFromZhihus();
  getNewsFromsohu();
  //getNewsFromToutiao();
  News.find({}, (err, news) =>{
    res.render('index', {news:news})
  })
}