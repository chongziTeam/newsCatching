$(function(){
  var body = $('body'), newsArr = [];
  alert('kkk')
  $.ajax({
    type:'get',
    dataType:'json',
    url:'/api/getNews',
    success:function(msg){
      if(msg.code == 200){
        msg.data.forEach(function(item){
          render(item.img, item.link, item.title, item.time);
        })
      }else{
        body.innerText('暂无数据');
      }
    },
    error:function(err){
      alert(err);
    }
  });

  function render(src, href, title, time){
    var container = $('<div></div>').addClass('box container');
    var boxLeft = $('<div></div>').addClass('box-left');
    var img = $('<img />').attr('src', src);
    var boxInner = $('<div></div>').addClass('box-inner');
    var h4 = $('<h4></h4>');
    var a = $('<a></a>').attr('href', href);
    var time = $('<time></time>');
    var btnBox = $('<div></div>').addClass('btn');
    var btn1 = $('<button></button>').addClass('ui button');
    var btn2 = $('<button></button>').addClass('ui button');
    var btn3 = $('<button></button>').addClass('ui button');
    a.appendTo(h4);
    h4.appendTo(boxInner);
    img.appendTo(boxLeft);
    boxInner.appendTo(boxLeft);
    time.appendTo(boxLeft);
    btn1.appendTo(btnBox);
    btn2.appendTo(btnBox);
    btn3.appendTo(btnBox);
    btnBox.appendTo(boxLeft);
    boxLeft.appendTo(container);
    container.appendTo(body);      
  }
})