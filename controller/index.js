const News = require('../model/newsModel');
exports.newsList = function(req, res){
  News.find()
    .sort({'isTop':-1, 'time':-1})
    .exec()
    .then((news) =>{
      let date = new Date();
      let newsArr = [];
      res.render('index', {news:news})
  }, (err) =>{
    console.log(err)
  })
}