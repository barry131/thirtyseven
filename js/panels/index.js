/*通用二维码pop-up*/
// $(document).ready(function(){
//      $(".com-border1").click(function(){   //点击关注显示二维码
//         $(".common-twocode").show();
//         $("html").css({"overflow":"hidden"})  //显示pop-up背景不动
//      }); 
//      $(".clos").click(function(){          //点击pop-up关闭按钮
//         $(".common-twocode").hide();
//         $("html").css({"overflow":"auto"})   //关闭pop-up背景可动
//      });  
// })

define(function (require, exports, module) { 
    require('libs/jquery-1.11.1.min');
    require('libs/eub.js');
    var address = require('libs/address.js');
  
    require.async(['banner/jquery.touchSlider'],function(){
        address.init(function(obj){
            obj.slit();
        });
    })
var index = eub.register('eub.index');
	
	index.linkSer = function(){ //联系客服    如果isFans：1 已经关注   isFans：0 没有关注
		$('.linkSer').click(function(){
			$(".common-twocode").show();
			$("html").css({"overflow":"hidden"})  //显示pop-up背景不动
		});
	}
	index.closEwm = function(){
		$(".clos").click(function(){          //点击pop-up关闭按钮
			$(".common-twocode").hide();
			$("html").css({"overflow":"auto"})   //关闭pop-up背景可动
		 }); 
	}
	index.init = function(){
		index.linkSer();
		index.closEwm();
	}
    exports.init = function () {
   
        
    }

})

