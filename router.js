// var getNewsFromZhihu = require('./controller/zhihu').list;
// var getNewsFromTengxun =require('./controller/tengxun').tengxunList;
// var getNewsFromsohu = require('./controller/sohu').list;

var getNewsFromZhihus = require('./scraper/zhihu').getNewsFromZhihus;
var getNewsFromsohu = require('./scraper/sohu').getNewsFromsohu;
var tengxunNews = require('./scraper/tengxun').tengxunNews;
module.exports = function(app){
  app.get('/', (req, res) =>{
    getNewsFromsohu();
    getNewsFromZhihus();
    tengxunNews();
    res.send('数据爬完了');
  })
  // app.get('/zhihu', (req, res) =>{
  //   getNewsFromZhihus();
  //   getNewsFromZhihu(req,res);
  // });

  // app.get('/tengxun', (req, res) =>{
  //   tengxunNews();
  //   getNewsFromTengxun(req,res);
  // });

  // app.get('/sohu', (req, res) =>{
  //   getNewsFromsohu(req,res);
  // })
}