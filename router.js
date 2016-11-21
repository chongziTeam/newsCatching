const News = require('./model/newsModel');
var news = require('./controller').newsList;
// var getNews = require('./api/getNews')
var getNewsFromsohu = require('./scraper/sohu').getNewsFromsohu;
module.exports = function(app){
  app.get('/', (req, res) =>{
    getNewsFromsohu();
    //res.send('数据爬完了');
    news(req, res);
  });
  
  //获取信息列表
  app.get('/api/getNews', (req, res) =>{
    News.find()
      .sort({'isTop':-1, time:-1})
      .exec()
      .then((doc) =>{
      res.json({code:200, data:doc})
    }, (err) =>{
      res.json({code:403, data:[], message:'暂无数据'})
    })
  });

  //获取20条信息
  app.get('/api/twenty', (req, res) =>{
    var newsArr = [];
    News.find()
      .limit(20)
      .sort({'isTop':-1, time:-1})
      .exec()
      .then((doc) =>{
        res.json({code:200, data:doc});
      })
  })
  
  //信息置顶或取消置顶 tag=true置顶
  app.get('/api/toTop', (req, res) =>{
    var id = req.param('id');
    var tag = req.param('isTop');
    News.findOneAndUpdate({id:id}, {$set: { 'isTop': tag }})
      .exec()
      .then((doc) =>{
          res.json({code:200, message:'操作成功', data:doc})       
      }, (err) =>{
        res.json({code:10001, message:err})
      })
  });

  //删除信息
  app.get('/api/delete', (req, res) =>{
    var id = req.param('id');
    if(!id){
      res.json({code:403, message:'没有文章id，无法删除'})
    }
    News.findOneAndRemove({id:id})
      .exec()
      .then((doc) =>{
        if(doc){
          res.json({code:200, message:'删除成功',data:doc})
        }else{
          res.json({code:10001, message:'该文章已不存在'})
        }
      })
  })
}