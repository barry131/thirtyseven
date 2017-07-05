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
    var shop = require('libs/shop.js');
    var poput = require('libs/poput');
    var util = require('Util/util');
  
 
    var shopCar = eub.register('eub.shopCar')
	
	shopCar.check = function(){		//全选及计算总金额
		$(".order-info :checkbox").on('click',function(){
			var inplen = $(".order-all li").find(":checkbox").length;
			var total = $(".totalprice").text();
			var totalprice = 0;
			if($(this).attr("id") == 'chose-all'){  //全选
				var checkAllboolean = $("#chose-all").is(":checked");
				if(checkAllboolean){
					$(".order-all li .chose-inp img").attr('src','images/chose-gou.png');
					$(".order-all li").find("input:checkbox").prop("checked",true);
					$(".chose-all img").attr('src','images/chose-gou.png');
					//计算全部总额
					$(".totalprice").text(util.tmoney(inplen));
				}else{
					//不全选
					$(".chose-all img").attr('src','images/chose-circle.png');
					$(".order-all li .chose-inp img").attr('src','images/chose-circle.png');
					$(".order-all li").find("input:checkbox").prop("checked",false);
					$(".totalprice").text("0.00");
				}
			}else{
				if($(this).is(":checked")){  //单选
					if($(".order-all li").find(":checkbox").length == $(".order-all li").find(":checkbox:checked").length){ //是否全选
						$("#chose-all").find(":checkbox").prop("checked",true);
						$(".chose-all img").attr('src','images/chose-gou.png');
						$(this).prev().attr('src','images/chose-gou.png');
						
						//计算金额
						$(".totalprice").text(util.aORmmoney($(this).parents('li').find(".price-one").text(),$(this).parents('li').find(".pro-num").val(),true,total));
					}else{
						$(this).prev().attr('src','images/chose-gou.png');
						
						//计算金额
						$(".totalprice").text(util.aORmmoney($(this).parents('li').find(".price-one").text(),$(this).parents('li').find(".pro-num").val(),true,total));
					}
				}else{  //不选
					$("#chose-all").prop("checked",false);
					$(".chose-all img").attr('src','images/chose-circle.png');
					$(this).prev().attr('src','images/chose-circle.png');
					
					//计算金额
					$(".totalprice").text(util.aORmmoney($(this).parents('li').find(".price-one").text(),$(this).parents('li').find(".pro-num").val(),false,total));
				}
			}
		});
	}
    shopCar.topay = function(){		//去结算
		$(".topay").click(function(){
			var checklen = $(".order-all li").find(":checkbox").length;
			var datas = [];
			for(var i = 0; i < checklen; i++){
				if($(".order-all li:eq(" + i + ")").find(":checkbox:checked").length){
					datas.push("id:"+$(".order-all li:eq(" + i + ")").find(":checkbox:checked").attr('data-id'),"price:"+$(".order-all li:eq(" + i + ")").find(".price-one").text(),"num:"+$(".order-all li:eq(" + i + ")").find(".text_box").val());
				}
			}
			if(checklen){
				util.ajax('post',url,datas,function(data){});
			}
		});
	}
	
	shopCar.editCar = function(){	//修改购物车
		$('.finish-procar').click(function(){
			var datas = [];
			var carprolen = $('.order-all li').length;
			//console.log(carprolen);
			for(var i = 0; i < carprolen; i++){
				datas.push("id:"+$(".order-all li:eq(" + i + ")").find(":checkbox").attr('data-id'),"num:"+$(".order-all li:eq(" + i + ")").find(".text_box").val());
			}
			var url = '';
			util.ajax('post',url,datas,function(data){});
		});
	}
	shopCar.delCar = function(){	//删除购物车的商品	
		$('.dele-carpro').click(function(){
			var checklen = $(".order-all li").find(":checkbox:checked").length;
			if(checklen > 0){
				var datas = [];
				for(var i = 0; i < checklen; i++){
					datas.push("id:"+$(".order-all li").find(":checkbox:checked:eq(" + i + ")").attr('data-id'));
				}
				var url = '';
				util.ajax('post',url,datas,function(data){

					poput.alertHtml({
						htmls:poput._alertHtml("确定删除" + checklen + "件商品吗？"),
						puputName:'alert',
						puputcenName:'alertinfo',
						btnupFun:function(dom,t){
							dom.on('click',function(){
								t.remove()
							})
						}
					});
					if(true){
						for(var i = 0; i < checklen; i++){
							$(".order-all li").find(":checkbox:checked:eq(" + i + ")").parents('li').remove();
						}
					}
				});
			}
		});
	}
	
    shopCar.init = function(){
		shopCar.check();
		shopCar.topay();
		shopCar.editCar();
		shopCar.delCar();
        shop.add({adddom:$('.control-btn .add'),
			addFunction:function(n,b,o){
				var isno = o.parents('li').find(":checkbox").is(":checked");
				if(isno){
					var total = $(".totalprice").text();
					var price = o.parents('.control-btn').prev().find('.price-one').html();
					$(".totalprice").text(util.aORmmoney(price,1,b,total));
				}
			}
		}).add({adddom:$('.control-btn .min'),
			addFunction:function(n,b,o){
				var isno = o.parents('li').find(":checkbox").is(":checked");
				if(isno){
					var total = $(".totalprice").text();
					var price = o.parents('.control-btn').prev().find('.price-one').html();
					$(".totalprice").text(util.aORmmoney(price,1,b,total));
				}
			}})
    }

    exports.init = function () {
        shopCar.init();
        
    }

})

