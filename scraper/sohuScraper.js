var page = require('webpage').create(),
    pageMsg = '',
    pageStr = '',
    count = 0;
var mypath = './data/sohu.txt';
var fs = require('fs');
loadInProgress = false;
phantom.outputEncoding="gbk";

page.onLoadStarted = function(){
  count++;
  loadInProgress = true;
  console.log('load started');
};

page.onLoadFinished = function(){
  loadInProgress = false;
  console.log('load finished');
};

page.open('http://learning.sohu.com/xiaoxueedu/index.shtml',function(){
  setTimeout(function(){
    page.evaluate(function(){
      var table = document.getElementsByTagName('table')[2];
      var td = table.getElementsByTagName('a')[2];
      td.click();
    })
  }, 1000)
  //page.render('sohu'+count+'.png');
});

var interval = setInterval(function(){
  
  if(count<5){
    getMsg();
  }else{
    try{
      fs.write(mypath, pageStr);
    }catch(e){
      console.log(e)
    }
    console.log('pageMsg', pageStr)
    phantom.exit();
  }
}, 200);

function getMsg(){
  pageStr += pageMsg;
  pageMsg = page.evaluate(function(obj){
      var newsMsgArrTwo = '';
      var box = document.querySelectorAll('.list-box li .published');
      for(var i=0, len=box.length; i<len; i++){
      var title_box = box[i].querySelector('h3 .content-title a');
      var img_box = box[i].querySelector('.content-pic a img') || '';
      var timeString = box[i].querySelector('.publish-footer .time').textContent;
      var times = timeString.replace('年','-').replace('月','-').replace('日',' ');
      //var time = Date.parse(new Date(date));
      var title = title_box.text;
      var title_href = title_box.href;
      var img = img_box.src || 'http://pic.58pic.com/58pic/15/49/22/44F58PICv5G_1024.png';
      newsMsgArrTwo += title +'||' + title_href + '||' + img + '||' + times + '&&';
    }; 
      var table = document.getElementsByTagName('table')[2];
      var td = table.getElementsByTagName('a')[2];
      var boxs = document.getElementsByClassName('content-title')[0];
      var text = boxs.getElementsByTagName('a')[0].text;
      td.click();     
      return newsMsgArrTwo;
    });
    // setTimeout(function(){
    //   page.render('sohu'+count+'.png');
    // },10);    
};