var news = require('./controller').newsList;
module.exports = function(app){
  app.get('/', (req, res) =>{
    //res.send('数据爬完了');
    news(req, res);
  })
}