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
    var eub = require('libs/eub.js');
    var address = require('libs/address.js');
    var shop = require('libs/shop.js');
    var poput = require('libs/poput');
    var util = require('Util/util');
    require.async(['banner/jquery.touchSlider'],function(){
        address.init(function(obj){
            obj.slit();
        });
    })
 
    var order = eub.register('eub.order')
	
	order.tabNav = function(){		//购物车nav切换
		$(".car-nav li").click(function(){
			$(this).siblings().removeClass("switch-bor");
			$(this).addClass("switch-bor");
			if($(this).index() == 1){
				$('.botm-show').show();
				$('.com-backimg').hide();
			}else{
				$('.botm-show').hide();
				$('.com-backimg').show();
			}
			$(".orderinfo ul").hide();
			$(".orderinfo ul:eq(" + $(this).index() + ")").show();
		});
	}
	
	order.remindSend = function(){		//提醒卖家发货
		$('.remindSend').click(function(){
			var datas = {orderId:$(this).attr('data-orderId')};
			var url = '';
			//util.ajax('post',url,datas,function(data){
				poput.alertHtml({
					htmls:'<p>成功提醒卖家！</p>',
					puputName:'alert',
					puputcenName:'alertinfo',
					alertFun:function(dom){
						setTimeout(function(){
							dom.remove();
						},2000)
					}
				});
			//});
		});
	}
	
	order.cofirmRecive = function(){		//确认收货
		$(".confirmRecive").click(function(){
			var datas = {orderId:$(this).attr('data-orderId')};
			var url = '';
			var self = $(this);
			//util.ajax('post',url,datas,function(data){
				poput.alertHtml({
					htmls:poput._alertHtml("确定收货？"),
					puputName:'alert',
					puputcenName:'alertinfo',
					btnupFun:function(dom,t){
						dom.on('click',function(){
							t.remove()
						})
					}
				});
				if(true){
					self.text("订单完成");
				}
			//});
		});
	}
	
	order.delOrder = function(){		//删除订单
		$(".del-order").click(function(){
			var self = $(this);
			var url = '';
			var datas = {orderId:$(this).attr('data-orderid')}
			//util.ajax('post',url,datas,function(data){
				poput.alertHtml({
					htmls:poput._alertHtml("确定要删除订单吗？"),
					puputName:'alert',
					puputcenName:'alertinfo',
					btnupFun:function(dom,t){
						dom.on('click',function(){
							t.remove()
						})
					}
				});
				if(true){
					self.parents('li').remove();
					if($('.myorder li').length == 0){
						$('.myorder').append('<li class="alert-info">暂无订单</li>');
					}
				}
			//});
		});
	}
	
	order.check = function(){
		$('.chose-inp label :checkbox').click(function(){
			if($(this).is(':checked')){
				$(this).prev().attr('src','images/chose-gou.png');
			}else{
				$(this).prev().attr('src','images/chose-circle.png');
			}
		});
	}
	
	order.continuPay = function(){//继续支付
		$(".continuPay").click(function(){
			var checklen = $(".order-all li").find(":checkbox").length;
			var datas = [];
			for(var i = 0; i < checklen; i++){
				if($(".order-all li:eq(" + i + ")").find(":checkbox:checked").length){
					datas.push("id:"+$(".order-all li:eq(" + i + ")").find(":checkbox:checked").attr('data-id'));
				}
			}
			var url = '';
			if(checklen > 0){
				//util.ajax('post',url,datas,function(data){
					if(true){
						
					}
				//});
			}
		});
	}

	order.toPay = function(){//支付
                     $(".toPay").click(function(){
                     		var input = $("#order_id").val();
                     		 util.ajax('post',url,datas,function(data){
                     		 
                     		 });
                        
                     });
            }

	order.closePay = function(){	//关闭支付
		$(".closePay").click(function(){
			var checklen = $(".order-all li").find(":checkbox").length;
			var datas = [];
			for(var i = 0; i < checklen; i++){
				if($(".order-all li:eq(" + i + ")").find(":checkbox:checked").length){
					datas.push("id:"+$(".order-all li:eq(" + i + ")").find(":checkbox:checked").attr('data-id'));
				}
			}
			var url = '';
			if(checklen > 0){
				//util.ajax('post',url,datas,function(data){
					poput.alertHtml({
						htmls:poput._alertHtml("确定关闭支付？"),
						puputName:'alert',
						puputcenName:'alertinfo',
						btnupFun:function(dom,t){
							dom.on('click',function(){
								t.remove()
							})
						}
					});
					if(true){
						
					}
				//});
			}
		});
	}
	
    order.init = function(){
		order.tabNav();
		order.remindSend();
		order.cofirmRecive();
		order.delOrder();
		order.check();
		order.continuPay();
		order.closePay();
		order.toPay();
    }

    exports.init = function () {
        order.init();
        
    }

})

