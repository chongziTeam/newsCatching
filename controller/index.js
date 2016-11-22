var News = require('../model/newsModel');
exports.newsList = function(req, res){
  News.find()
    .sort({'isTop':-1, 'time':-1})
    .exec()
    .then((news) =>{
      var date = new Date();
      var newsArr = [];
      res.render('index', {news:news})
  }, (err) =>{
    console.log(err)
  })
}