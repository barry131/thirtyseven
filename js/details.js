$(document).ready(function() {
    $(".add").click(function(){         //数量+1 -1js
      var t=$(this).parent().find('.text_box'); 
      t.val(parseInt(t.val())+1)       //数量+1
	  var inventory = $(this).parent().find('.text_box').attr('data-id');            //库存数量
      if(parseInt(t.val()) > inventory){ 
        t.val(inventory); 
      }else{
		  if($(this).parents('li').find(':checkbox').is(":checked")){
			  var price = $(this).parents('li').find('.price-one').text();
			  money.aORmmoney(price,1,true);
		  }
	  }
    }); 
    $(".min").click(function(){       //数量+1 -1js
      var t=$(this).parent().find('.text_box'); 
      t.val(parseInt(t.val())-1)     //数量-1
      if(parseInt(t.val())<1){ 
        t.val(1); 
      }else{
		  if($(this).parents('li').find(':checkbox').is(":checked")){
			  var price = $(this).parents('li').find('.price-one').text();
			  money.aORmmoney(price,1,false);
		  }
	  }
    });
    
	/*$(".pro-num").change(function(){
		money.cmoney();
	});*/

    $(".co li a").click(function(){   //点击切换商品颜色
        $(this).toggleClass("red").parent().siblings().find('a').removeClass('red');
    });
}) 




