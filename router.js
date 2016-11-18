var news = require('./controller').newsList;
var getNewsFromsohu = require('./scraper/sohu').getNewsFromsohu;
module.exports = function(app){
  app.get('/', (req, res) =>{
    getNewsFromsohu();
    //res.send('数据爬完了');
    news(req, res);
  })
}