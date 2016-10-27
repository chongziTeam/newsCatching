var News = require('../model/newsModel');
exports.list=function(req, res){
  News.find((err, news) =>{
    console.log('news')
    res.render('zhihu',{news:news})  
  })
} 