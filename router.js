// var getNewsFromZhihu = require('./controller/zhihu').list;
var getNewsFromZhihu =require('./scraper/zhihu').getNewsFromZhihu;
module.exports = function(app){
  app.get('/zhihu', (req, res) =>{
    getNewsFromZhihu(req,res);
  })
}