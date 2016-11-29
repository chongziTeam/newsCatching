$(function(){
  var container = $('.container');
  var toTop = $('.toTop');
  var cancelTop = $('.cancelTop');
  var delBtn = $('.del');
  for(var i=0, len=container.length; i<len; i++){
    (function(i){
      var id = delBtn[i].getAttribute('data-del');
      var container = $('.container')[i];
      delBtn[i].onclick=function(){
        var tag = event.target.elements;
        $.ajax({
          type:'get',
          dataType:'json',
          url:'/api/delete?id='+id,
          success:function(msg){
            if(msg.code == 200){
              container.style.display = 'none';
              alert(msg.message)
            }else{
              alert(msg.message)
            }
          },
          error:function(err){
            alert(err);
          }
        }) 
      };
    })(i);

    (function(i){
      var id = toTop[i].getAttribute('data-top');
      toTop[i].onclick=function(){
        $.ajax({
          type:'get',
          dataType:'json',
          url:'/api/toTop?id='+id+'&isTop='+true,
          success:function(msg){
            if(msg.code == 200){
              
              container[i].classList.add('box');
              toTop[i].classList.remove('toTops');
              cancelTop[i].classList.add('toTops');
              alert(msg.message)
              location.reload();
            }
          },
          error:function(err){
            alert(err);
          }
        })
      }
    })(i);

     (function(i){
      var id = cancelTop[i].getAttribute('data-cancelTop');
      cancelTop[i].onclick=function(){
        $.ajax({
          type:'get',
          dataType:'json',
          url:'/api/toTop?id='+id+'&isTop='+false,
          success:function(msg){
            if(msg.code == 200){
              container[i].classList.remove('box');
              toTop[i].classList.add('toTops');
              cancelTop[i].classList.remove('toTops');
              alert(msg.message);
              location.reload();
            }
          },
          error:function(err){
            alert(err);
          }
        })
      }
    })(i);
  }
})

