var News = require('../model/newsModel');
exports.list=function(req, res){
  News.find({},(err, news) =>{   
    //console.log('pppppp',news)
    res.render('sohu',{news:news})     
  })
} 