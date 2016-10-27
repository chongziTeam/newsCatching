var News = require('../model/newsModel');
exports.list=function(req, res){
  News.find({'sohuId':"n471529303"},(err, news) =>{   
    console.log(news)
    res.render('sohu',{news:news}) 
     
  })
} 