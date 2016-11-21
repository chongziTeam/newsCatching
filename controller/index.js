var News = require('../model/newsModel');
exports.newsList = function(req, res){
  News.find((err, news) =>{
    res.render('index', {news:news})
  })
}