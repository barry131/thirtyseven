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
    require('libs/city_array');
    require('libs/city_call');
    require('libs/city_show');
    var eub = require('libs/eub.js');
    var shop = require('libs/shop.js');
    var poput = require('libs/poput');
    var util = require('Util/util');
 
    var address = eub.register('eub.address')
	
	address.touch = function(){		//touch事件  我的地址，左滑删除
		var _self = null;
		var startx,endx,slide;
		var touch = {
			touchStartFun:function(event){
				var touch = event.touches[0];
				startx = touch.pageX;
				$('.del-btncss').css('transform','translate3d(0px, 0px, 0px)');
			},
			touchMoveFun:function(event){
				var touch = event.touches[0];
				endx = touch.pageX;
				var finishendx = startx - endx;
				if(Math.abs(finishendx) > 40){
					if(startx - endx < 0){  //左右滑动
						slide = false ; //向右滑动
					}else{
						slide = true; //向左滑动
					}
				}
			},
			touchEndFun:function(){
				if(slide){  //向右滑动
					$(this).children('.del-btncss').css('transform','translate3d(-80px, 0px, 0px)');
					slide = false;
				}else{//向左滑动
					$(this).children('.del-btncss').css('transform','translate3d(0px, 0px, 0px)');
					slide = false;
				}
			},
			init:function(){
				_self = this;
				for(var i = 0; i < $('.swipeout').length; i++){
					$(".swipeout")[i].addEventListener('touchstart', _self.touchStartFun, false);  
					$(".swipeout")[i].addEventListener('touchmove', _self.touchMoveFun, false);
					$(".swipeout")[i].addEventListener('touchend', _self.touchEndFun, false);
				}
			}
		}
		touch.init();
	}
	
	address.addRec = function(){	//初此进入时，添加收货地址
		$('.recinfoId').click(function(){
			if(!$('.recinfoId').attr('data-id')){
				$('#addAdress').show();
				//添加收货地址
				$('#addAdress .addinfo').show();
				$('#addAdress .editinfo').hide();
			}else{
				$('#choiceAddress').show();
			}
		});
	}
	address.addORedit = function(){		//添加收货地址
		$('.addAdress').click(function(){
			$('#addAdress .addinfo').show();
			$('#addAdress .editinfo').hide();
			$('.loading').find("input").val("");
			initLocation({sheng_val:"---",shi_val:"",xian_val:""});
			$('#addAdress').show();
		});
	}
	address.editAddress = function(){	//修改收货地址
		$('.list-block').on('click','.editAddress',function(){
			$('#addAdress .addinfo').hide();
			$('#addAdress .editinfo').show();
			
			var addInfo = $(this).find('.defAdd').text();
			var arr = addInfo.split(" ");
			$('#recAddressId').val($(this).next().next().attr('data-id'));
			$('#name').val($(this).find('.defName').text());
			$('#address').val(arr[3]);
			$('#tel').val($(this).find('.defTel').text());
			initLocation({sheng_val:arr[0],shi_val:arr[1],xian_val:arr[2]});
			$('#addAdress').show();
			console.log(arr)
		});
	}
	address.addOReditData = function(){		//添加修改收货地址
		$(".add_goodsaddress,.finished").click(function(){
			//var addORedit = $(this).attr('data-is');	  //用来判断是编辑还是修改  0:修改    1:添加
			var address = $('#address').val();
			var name = $('#name').val();
			var tel = $('#tel').val();
			var zipcod = $('#zipcod').val();
			var sheng = $('#sheng option:checked').text();
			var shi = $('#shi option:checked').text();
			var xian = $('#xian option:checked').text();
			if(name == ""){
				poput.alertHtml({
					htmls:'<p>收获人姓名不能为空！</p>',
					puputName:'alert',
					puputcenName:'alertinfo',
					alertFun:function(dom){
						setTimeout(function(){
							dom.remove();
						},2000)
					}
				});
			}else if(tel == ""){
				poput.alertHtml({
					htmls:'<p>手机号码不能为空！</p>',
					puputName:'alert',
					puputcenName:'alertinfo',
					alertFun:function(dom){
						setTimeout(function(){
							dom.remove();
						},2000)
					}
				});
			}/*else if(zipcod == ""){
				poput.alertHtml({
					htmls:'<p>邮政编码不能为空！</p>',
					puputName:'alert',
					puputcenName:'alertinfo',
					alertFun:function(dom){
						setTimeout(function(){
							dom.remove();
						},2000)
					}
				});
			}*/else if(sheng == "---"){
				poput.alertHtml({
					htmls:'<p>请选择省份！</p>',
					puputName:'alert',
					puputcenName:'alertinfo',
					alertFun:function(dom){
						setTimeout(function(){
							dom.remove();
						},2000)
					}
				});
			}else if(shi == "--"){
				poput.alertHtml({
					htmls:'<p>请选择市！</p>',
					puputName:'alert',
					puputcenName:'alertinfo',
					alertFun:function(dom){
						setTimeout(function(){
							dom.remove();
						},2000)
					}
				});
			}else if(xian == "--"){
				poput.alertHtml({
					htmls:'<p>请选择区域！</p>',
					puputName:'alert',
					puputcenName:'alertinfo',
					alertFun:function(dom){
						setTimeout(function(){
							dom.remove();
						},2000)
					}
				});
			}else if(address == ""){
				poput.alertHtml({
					htmls:'<p>请填写详细地址！</p>',
					puputName:'alert',
					puputcenName:'alertinfo',
					alertFun:function(dom){
						setTimeout(function(){
							dom.remove();
						},2000)
					}
				});
			}else{
				var url = '';
				var datas = [];
				var isedit = $("#recAddressId").val();   //判断收货地址id是否存在
				if(isedit){
					datas.push("id:"+isedit,"name:"+name,"tel:"+tel,"zipcod:"+zipcod,"address:"+sheng+" "+shi+" "+xian+" "+address);
				}else{
					datas.push("name:"+name,"tel:"+tel,"zipcod:"+zipcod,"address:"+sheng+" "+shi+" "+xian+" "+address);
				}
				var self = $(this);
				//util.ajax('post',url,datas,function(data){
					
					if(true){
						$('.loading').find("input").val("");
						var dataId = 1
						var addData = sheng + " " + shi + " " + xian + " " + address;
						$('.recinfoId').attr('data-id',dataId);
						$('.receivingName').text(name);
						$('.receivingTel').text(tel);
						$('.receivingAddress').text(addData);
						if(!isedit){
						initLocation({sheng_val:"---",shi_val:"",xian_val:""});
							var li ="<li class='swipeout'>\
										<div class='address-info editAddress' data-is='0'>\
											<div class='add-in'>\
												<p><span>收获人：<i class='defName'>"+name+"</i></span><span class='defTel'>"+tel+"</span></p>\
												<p><i class='default-address'>[默认]</i><span class='defAdd'>"+addData+"</span></p>\
											</div>\
										</div>\
										<span class='address-choseimg setDefaultAddress'><img src='images/default-chose.png'></span>\
										<div class='del-btncss address-id' data-id='1'>删除</div>\
									</li>";
							$(".list-block ul li").find(".address-choseimg.setDefaultAddress").children().attr('src','images/chose-circle.png')
							$(".list-block ul li").find(".address-choseimg.setDefaultAddress").addClass('showimg')
							$(".list-block ul").append(li);
						}else{
							var $obj = $('[data-id="'+isedit+'"]')
							$obj.parents('li').find('.defName').html(name);
							$obj.parents('li').find('.defTel').html(tel);
							$obj.parents('li').find('.defAdd').html(addData);
						}
						$(this).parents('.loading').hide();
					}
				//});
			}
		});
	}
	
	address.defalutAdd = function(){		//设置成默认地址
		$('.list-block').on('click','.setDefaultAddress',function(){
			var addressid = $(this).next().attr('data-id');
			$('.setDefaultAddress img').attr('src','images/chose-circle.png');
			$(this).children().attr('src','images/default-chose.png');
			var dataname = $(this).parents('li').find('.defName').text();
			var datatel = $(this).parents('li').find('.defTel').text();
			var dataadd = $(this).parents('li').find('.defAdd').text();
			var datas = {addressid:addressid};
			var self = $(this);
			var url = '';
			//util.ajax('post',url,datas,function(data){
				if(true){
					console.log(dataname+datatel+dataadd);
					$('.recinfoId').attr('data-id',addressid);
					self.parents('.loading').hide();
					$('.recinfoId').attr('data-id',addressid);
					$('.receivingName').html(dataname);
					$('.receivingTel').html(datatel);
					$('.receivingAddress').html(dataadd);
				}
			//});
		});
	}
	address.defalutAddT = function(){		//设置成默认地址
		$('.loading .setDefaultAddress').click(function(){
			var addressid = $('#recAddressId').val();
			var datas = {addressid:addressid};
			var self = $(this);
			var url = '';
			//util.ajax('post',url,datas,function(data){
				if(true){
					$('.recinfoId').attr('data-id',addressid);
						if($('.receivingName').length){
						$('.receivingName').html($('[data-id="'+addressid+'"]').prev().prev().find('.defName').html());
						$('.receivingTel').html($('[data-id="'+addressid+'"]').prev().prev().find('.defTel').html());
						$('.receivingAddress').html($('[data-id="'+addressid+'"]').prev().prev().find('.defAdd').html());
						
						$('.setDefaultAddress img').attr('src','images/chose-circle.png');
						$(this).children().attr('src','images/default-chose.png');
						$('[data-id="'+addressid+'"]').prev().removeClass('showimg');
						$('[data-id="'+addressid+'"]').prev().children().attr('src','images/default-chose.png');
					}else{
						$('.setDefaultAddress img').attr('src','images/chose-circle.png');
						$('.setDefaultAddress').addClass('showimg');
						$('[data-id="'+addressid+'"]').prev().removeClass('showimg');
						$('[data-id="'+addressid+'"]').prev().children().attr('src','images/default-chose.png');
					}
					self.parents('.loading').hide();
				}
			//});
		});
	}
	address.delRec = function(){	//删除收货地址按钮
		$('.address-id').click(function(){
			var addressid = $('#recAddressId').val();
			console.log(addressid);
			var datas = {addressid:addressid}
			var self = $(this);
			var url = '';
			//util.ajax('post',url,datas,function(data){
				if(true){
					self.parents('.loading').hide();
					console.log(self.parents('.loading'));
					$('[data-id="'+addressid+'"]').parents('li').remove();
				}
				
			//});
		});
	}
	
	address.closeWin = function(){
		$('.close-btn').click(function(){$(this).parents('.loading').hide()});
	}
	
	address.subOrder = function(){		//提交订单
		$(".submitOrder").click(function(){
			var self = $(this);
			if($('.recinfoId').attr('data-id') != ""){
				var prolen = $('.proinfo').length;
				var datas = [];
				for(var i = 0; i < prolen; i++){
					datas.push($('.proinfo').attr('data-id') + "#" + $('.pro-price:eq(' + i + ')').text() + "#" + $('.pro-num:eq(' + i + ')').val());
				}
				var url = '';
				util.ajax('post',url,datas,function(data){
					self.parent().css({"background":"#9c9c9c","color":"#fff"}).text("提交中…");
					var $wrap = $('<div></div>');
					$wrap.css({
						"position":"fixed",
						"top":0,
						"left":0,
						"width":"100%",
						"height":"100%",
						"z-index":999
					});
					$('body').append($wrap);
				});
			}else{
				alert("请填写收货信息！");
			}
		});
	}
	
	
    address.init = function(){
		address.touch();
		address.addRec();
		address.addORedit();
		address.editAddress();
		address.addOReditData();
		address.defalutAdd();
		address.defalutAddT();
		address.delRec();
		address.closeWin();
		address.subOrder();
    }

    exports.init = function () {
        address.init();
    }

})

