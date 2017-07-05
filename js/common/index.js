/*通用二维码pop-up*/
$(document).ready(function(){
     $(".com-border1").click(function(){   //点击关注显示二维码
        $(".common-twocode").show();
        $("html").css({"overflow":"hidden"})  //显示pop-up背景不动
     }); 
     $(".clos").click(function(){          //点击pop-up关闭按钮
        $(".common-twocode").hide();
        $("html").css({"overflow":"auto"})   //关闭pop-up背景可动
     });  
})







/*点击刷新*/
/*var htmlreload = function(){
	var $dom = $('<div class="htmlreloaddom"></div>');
	$dom.css({
		"position":"absolute",
		"top":"5%",
		"left":"5%",
		"z-index":9999,
		"background-color":"red",
		"width":"80px",
		"height":"40px",
		"line-height":"40px",
		"text-align":"center"
	})
	$dom.html('点击刷新');
	$('body').append($dom);
	$dom.on('click',function(){
		window.location.reload(true);
	})
}()

*/






