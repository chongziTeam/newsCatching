var getNewsFromZhihu = require('./controller/zhihu').list;
// var getNewsFromZhihu =require('./scraper/zhihu').getNewsFromZhihu;
var getNewsFromTengxun =require('./controller/tengxun').tengxunList;

module.exports = function(app){
  app.get('/zhihu', (req, res) =>{
    getNewsFromZhihu(req,res);
  });

  app.get('/tengxun', (req, res) =>{
    getNewsFromTengxun(req,res);
  })
}