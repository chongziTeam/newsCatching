var News = require('../model/newsModel');
var scraperjs = require('scraperjs');
var fs = require('fs');
var stream = require('stream');
const path = './scraper/data/sohu.txt';
var rs = fs.createReadStream(path);
var newsStr = '', newsArr = [];

exports.getNewsFromsohu = function (){
  new Promise((resolve, reject) =>{
    rs.on('data', (chunk) =>{
      newsStr += chunk;
    });

    rs.on('end', () =>{
      var newList = [];
      newList = newsStr.split('&&');
      for(var i=0, len=newList.length; i<len; i++){
        if(!newList[i]){
          return;
        }else{
          let newsMsg = newList[i].split('||');
          let titles = newsMsg[0].split('null');
          let title = titles[titles.length-1];
          if(newsMsg[1]){
            let ids = newsMsg[1].split('/')[4];
            console.log('ppp', ids)
            if(!ids){
              return;
            }
            let id = ids.split('.')[0]; 
            let time = newsMsg[3];
            var newsObj = {
              title:title,
              link:newsMsg[1],
              title_href:newsMsg[2],
              publishTime:time,
              id:id
            };
            //console.log('lllll', newsObj.publishTime)
            newsArr.push(newsObj);
          }        
        }
        resolve(newsArr)
      }
      console.log('read file successfully')
    });

    rs.on('error', (err) =>{
      console.log(err);
      reject(err);
    })
  }).then((data) =>{
    data.forEach((n) =>{
        let newsMsg = {
          title:n.title,
          img:n.title_href,
          link:n.link,
          time:n.publishTime,
          id:n.id,
        };
        News.find({id:n.id})
          .exec()
          .then((doc) =>{
            if(doc.length == 0){
              News.create(newsMsg)
            }else{
              //console.log('该条数据已存在', doc);
            }
          })
      })
  }).catch( (err) =>{
    console.log(err)
  })
}


