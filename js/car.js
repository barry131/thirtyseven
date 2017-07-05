// JavaScript Document
//计算金额
var money = {
	fmoney: function(s, n){ //s:传入的float数字 ，n:希望返回小数点几位   （数字）
		n = n > 0 && n <= 20 ? n : 2; 
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
		var l = s.split(".")[0].split("").reverse(), 
		r = s.split(".")[1]; 
		t = ""; 
		for(i = 0; i < l.length; i ++ ) 
		{ 
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
		} 
		// return t.split("").reverse().join("") + "." + r; 
		return parseFloat(s.replace(/[^\d\.-]/g, ""));
	},
	rmoney: function(s, n){ //s:传入的float数字 ，n:希望返回小数点几位  （字符）
		n = n > 0 && n <= 20 ? n : 2; 
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
		var l = s.split(".")[0].split("").reverse(), 
		r = s.split(".")[1]; 
		t = ""; 
		for(i = 0; i < l.length; i ++ ) 
		{ 
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
		} 
		// return t.split("").reverse().join("") + "." + r; 
		return t.split("").reverse().join("") + "." + r; 
	},
	tmoney: function(){ //计算全部金额
		var total = 0;
		inplen = $(".order-all li").find(":checkbox").length;
		for(var i = 0; i < inplen; i++){
			total = money.fmoney(total,2) + (money.rmoney($(".price-one:eq(" + i + ")").text(),2) * money.rmoney($(".pro-num:eq(" + i + ")").val(),2));
		}
		$(".totalprice").text(total.toFixed(2));
	},
	aORmmoney: function(p,n,b){ //p:传入的单价,n:传入的数量,b:加或减 false减 true加
		var total = $(".totalprice").text();
		if(b){
			total = money.fmoney(total,2) + (money.fmoney(p,2)*n);
		}else{
			total = money.fmoney(total,2) - (money.fmoney(p,2)*n);
		}
		$(".totalprice").text(total.toFixed(2));
	}
}
//提示弹框
var alertHTML = '<div class="alert closeAlert">\
					<div class="alertinfo">\
						<p></p>\
					</div>\
				</div>';
//再次确定或取消弹框
var alertHTML2 = '<div class="alert">\
					<div class="alertinfo">\
						<p></p>\
						<div class="alert-btn">\
							<a href="javascript:close();" class="cancel-btn">取消</a>\
							<a class="confirm-btn">确定</a>\
						</div>\
					</div>\
				</div>';
//提示弹框方法
function alert(text){
	$("body").append(alertHTML);
	$(".alert p").text(text)
	setTimeout(function(){$('.alert').hide()},2000);
}
//再次确定或取消 弹框方法
function confirm(text){
	$("body").append(alertHTML2);
	$(".alert p").text(text)
}
//关闭弹框
function close(){
	$(".alertinfo,.alert,.loading").hide();
}
$(function(){
	//touch事件  我的地址，左滑删除
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
	
	//全选及计算总额
	$(".order-info :checkbox").on('click',function(){
		var totalprice = 0;
		if($(this).attr("id") == 'chose-all'){  //全选
			var checkAllboolean = $("#chose-all").is(":checked");
			if(checkAllboolean){
				$(".order-all li .chose-inp img").attr('src','images/chose-gou.png');
				$(".order-all li").find("input:checkbox").prop("checked",true);
				$(".chose-all img").attr('src','images/chose-gou.png');
				//计算全部总额
				money.tmoney();
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
					money.aORmmoney($(".price-one:eq(" + i + ")").text(),$(".pro-num:eq(" + i + ")").val(),true)
				}else{
					$(this).prev().attr('src','images/chose-gou.png');
					
					//计算金额
					money.aORmmoney($(this).parents('li').find(".price-one").text(),$(this).parents('li').find(".pro-num").val(),true)
				}
			}else{  //不选
				$("#chose-all").prop("checked",false);
				$(".chose-all img").attr('src','images/chose-circle.png');
				$(this).prev().attr('src','images/chose-circle.png');
				
				//计算金额
				money.aORmmoney($(this).parents('li').find(".price-one").text(),$(this).parents('li').find(".pro-num").val(),false)
			}
		}
	});
	/*
	var inplen = $(".order-all li").find(":checkbox").length;  //商品个数
	$(".order-info :checkbox").on('click',function(){
		var totalprice = 0;
		if($(this).attr("id") == 'chose-all'){  //全选
			var checkAllboolean = $("#chose-all").is(":checked");
			//console.log(checkAllboolean);
			if(checkAllboolean){
				$(".order-all li .chose-inp img").attr('src','images/chose-gou.png');
				$(".order-all li").find("input:checkbox").prop("checked",true);
				//计算总额
				for(var i = 0; i < inplen; i++){
					totalprice = money.fmoney(totalprice,2) + (money.rmoney($(".price-one:eq(" + i + ")").text(),2) * money.rmoney($(".pro-num:eq(" + i + ")").val(),2));
				}
				$(".chose-all img").attr('src','images/chose-gou.png');
				$(".totalprice").text(totalprice.toFixed(2));
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
					for(var i = 0; i < inplen; i++){
						totalprice = money.fmoney(totalprice,2) + (money.rmoney($(".price-one:eq(" + i + ")").text(),2) * money.rmoney($(".pro-num:eq(" + i + ")").val(),2));
					}
				}else{
					$(this).prev().attr('src','images/chose-gou.png');
					totalprice = money.fmoney($(".totalprice").text(),2) + (money.rmoney($(this).parents('li').find(".price-one").text(),2) * money.rmoney($(this).parents('li').find(".pro-num").val(),2));
				}
			}else{  //不选
				$("#chose-all").prop("checked",false);
				$(".chose-all img").attr('src','images/chose-circle.png');
				$(this).prev().attr('src','images/chose-circle.png');
				totalprice = money.fmoney($(".totalprice").text(),2) - (money.rmoney($(this).parents('li').find(".price-one").text(),2) * money.rmoney($(this).parents('li').find(".pro-num").val(),2));
			}
			$(".totalprice").text(totalprice.toFixed(2));
		}
	});*/
	
	//购物车nav切换
	$(".car-nav li").click(function(){
		$(this).siblings().removeClass("switch-bor");
		$(this).addClass("switch-bor");
		if($(this).index() == 1){
			$('.botm-show').show();
		}else{
			$('.botm-show').hide();
		}
		$(".orderinfo ul").hide();
		$(".orderinfo ul:eq(" + $(this).index() + ")").show();
	});
	
	//删除订单
	$(".del-order").click(function(){
		confirm("确定要删除订单吗？");
		var orderObj = $(this).parents('li');
		var orderId = $(this).attr('data-orderid');
		var postData = {orderId:orderId}
		//确定删除订单
		$(".alert .confirm-btn").on('click',function(){
			$.ajax({
				url:'',
				dataType:'json',
				data:postData,
				type:'post',
				success:function(data){
					$(this).parents(".alert").hide();
					orderObj.remove();
				},
				error:function(){
				}
			});
		});
	});
	
	//加入购物车
	$(".joinShopingcart").click(function(){
		var proid = $('.proId').attr('data-proid');
		var proprice = $('.proPrice').text();
		var pronum = $('.text_box').val();
		var procolor = $('.red').parent().attr('data-aid');
		var postData = {proid:proid,proprice:proprice,pronum:pronum,procolor:procolor}
		$.ajax({
			url:'',
			dataType:'json',
			data:postData,
			type:'post',
			success:function(data){
				alert("商品已成功加入购物车！");
				$('.carpronum').text(parseInt($('.carpronum').text())+parseInt(pronum));
			},
			error:function(){
				alert("0！");
			}
		});
	});
	
	//删除购物车的商品
	$('.dele-carpro').click(function(){
		var checklen = $(".order-all li").find(":checkbox:checked").length;
		if(checklen > 0){
			confirm("确定删除" + checklen + "件商品吗？");//确定删除定单
			var proarr = [];
			for(var i = 0; i < checklen; i++){
				proarr.push($(".order-all li").find(":checkbox:checked:eq(" + i + ")").attr('data-id'));
			}
			$(".alert .confirm-btn").on('click',function(){
				$.ajax({
					url:'',
					dataType:'json',
					data:proarr,
					type:'post',
					success:function(data){
						for(var i = 0; i < checklen; i++){
							$(".order-all li").find(":checkbox:checked:eq(" + i + ")").parents('li').remove();
						}
					},
					error:function(){
					}
				});
			});
		}
	});
	
	//完成修改购物车
	$('.finish-procar').click(function(){
		var proarr = [];
		var carprolen = $('.order-all li').length;
		//console.log(carprolen);
		for(var i = 0; i < carprolen; i++){
			proarr.push($(".order-all li:eq(" + i + ")").find(":checkbox").attr('data-id') + "#" + $(".order-all li:eq(" + i + ")").find(".text_box").val());
		}
		$.ajax({
			url:'',
			dataType:'json',
			data:proarr,
			type:'post',
			success:function(data){
			},
			error:function(){
			}
		});
	});
	
	//去结算
	$(".topay").click(function(){
		var checklen = $(".order-all li").find(":checkbox").length;
		var proarr = [];
		for(var i = 0; i < checklen; i++){
			if($(".order-all li:eq(" + i + ")").find(":checkbox:checked").length){
				proarr.push($(".order-all li:eq(" + i + ")").find(":checkbox:checked").attr('data-id') + "#" + $(".order-all li:eq(" + i + ")").find(".price-one").text() + "#" + $(".order-all li:eq(" + i + ")").find(".text_box").val());
			}
		}
		if(checklen){
			$.ajax({
				url:'',
				dataType:'json',
				data:proarr,
				type:'post',
				success:function(data){
					
				},
				error:function(){
				}
			});
		}
	});
	
	//提醒卖家发货
	$('.remindSend').click(function(){
		var orderId = $(this).attr('data-orderId');
		$.ajax({
			url:'',
			dataType:'json',
			data:{orderId:orderId},
			type:'post',
			success:function(data){
				alert("成功提醒卖家！");
			},
			error:function(){
			}
		});
	});
	
	//确认收货
	$(".confirmReceipt").click(function(){
		confirm("确定收货？");
		var orderId = $(this).attr('data-orderId');
		//确定收货
		$(".alert .confirm-btn").on('click',function(){
			$.ajax({
				url:'',
				dataType:'json',
				data:{orderId:orderId},
				type:'post',
				success:function(data){
					$(this).parents(".alert").hide();
				},
				error:function(){
				}
			});
		});
	});
	
	
	//删除收货地址按钮
	$('.address-id').click(function(){
		var addressid = $(this).attr('data-id');
		var postData = {addressid:addressid}
		$.ajax({
			url:'',
			dataType:'json',
			data:postData,
			type:'post',
			success:function(data){
				alert("删除成功！");
				$(this).parents('li').remove();
			},
			error:function(){
			}
		});
	});
	
	//设置成默认地址
	$('.setDefaultAddress').click(function(){
		var addressid = $(this).attr('data-id');
		$('.setDefaultAddress img').attr('src','images/chose-circle.png');
		$(this).children().attr('src','images/default-chose.png');
		var dataname = $(this).parents('li').find('.defName').text();
		var datatel = $(this).parents('li').find('.defTel').text();
		var dataadd = $(this).parents('li').find('.defAdd').text();
		var postData = {addressid:addressid};
		
		//location 选择默认地址回调函数
		$('.recinfoId').attr('data-id',addressid);
		$(this).parents('.loading').hide();
		
		/*$.ajax({
			url:'',
			dataType:'json',
			data:postData,
			type:'post',
			success:function(data){
				//location 选择默认地址回调函数
				$('.recinfoId').attr('data-id',addressid);
				$(this).parents('.loading').hide();
			},
			error:function(){
			}
		});*/
	});
		
	//提交订单
	$(".submitOrder").click(function(){
		console.log($(this).parent().css("background","#9c9c9c").text("提交中…"));
		if($('.recinfoId').attr('data-id') != ""){
			var prolen = $('.proinfo').length;
			var postData = [];
			for(var i = 0; i < prolen; i++){
				postData.push($('.proinfo').attr('data-id') + "#" + $('.pro-price:eq(' + i + ')').text() + "#" + $('.pro-num:eq(' + i + ')').val());
			}
			console.log(postData);
			//$("body").append('<div class="loading"><img src="images/loading.gif"></div>');
			$.ajax({
				url:'',
				dataType:'json',
				data:postData,
				type:'post',
				success:function(data){
				},
				error:function(){
				}
			});
		}else{
			alert("请填写收货信息！");
		}
	});
	$('.close-btn').click(function(){$(this).parents('.loading').hide()});
	
	//初此进入时，添加收货地址
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
	//添加还是修改收货地址
	$('.addAdress,.editAddress').click(function(){
		if($(this).attr('data-is') == 1){
			$('#addAdress .addinfo').show();
			$('#addAdress .editinfo').hide();
		}else{
			$('#addAdress .addinfo').hide();
			$('#addAdress .editinfo').show();
		}
		$('#addAdress').show();
	});
	
	//添加修改收货地址
	$(".add_goodsaddress,.finished").click(function(){
		var addORedit = $(this).attr('data-is');
		var name = $('#name').val();
		var tel = $('#tel').val();
		var zipcod = $('#zipcod').val();
		var sheng = $('#sheng option:checked').text();
		var shi = $('#shi option:checked').text();
		var xian = $('#xian option:checked').text();
		var address = $('#address').val();
		if(name == ""){
			alert('收获人姓名不能为空！');
		}else if(tel == ""){
			alert('手机号码不能为空！');
		}else if(zipcod == ""){
			alert('邮政编码不能为空！');
		}else if(sheng == "---"){
			alert('请选择省份！');
		}else if(shi == "--"){
			alert('请选择市！');
		}else if(xian == "--"){
			alert('请选择区域！');
		}else if(address == ""){
			alert('请填写详细地址！');
		}else{
			/*$.ajax({
				url:'',
				dataType:'json',
				data:{id:id},
				type:'post',
				success:function(data){
					//location 添加地址回调函数
					$('.recinfoId').attr('data-id',data.id);
					$('.receivingName').text(name);
					$('.receivingTel').text(tel);
					$('.receivingAddress').text(sheng + " " + shi + " " + xian + " " + address);
					$(this).parents('.loading').hide();
				},
				error:function(){
				}
			});*/
		}
	});
	
	//继续支付
	$(".continuPay").click(function(){
		var checklen = $(".order-all li").find(":checkbox").length;
		var proarr = [];
		for(var i = 0; i < checklen; i++){
			if($(".order-all li:eq(" + i + ")").find(":checkbox:checked").length){
				proarr.push($(".order-all li:eq(" + i + ")").find(":checkbox:checked").attr('data-id'));
			}
		}
		if(checklen){
			$.ajax({
				url:'',
				dataType:'json',
				data:proarr,
				type:'post',
				success:function(data){
					
				},
				error:function(){
				}
			});
		}
	});
	
	//关闭支付
	$(".closePay").click(function(){
		confirm("确定关闭支付？");
		var checklen = $(".order-all li").find(":checkbox").length;
		var proarr = [];
		for(var i = 0; i < checklen; i++){
			if($(".order-all li:eq(" + i + ")").find(":checkbox:checked").length){
				proarr.push($(".order-all li:eq(" + i + ")").find(":checkbox:checked").attr('data-id'));
			}
		}
		//确定关闭支付
		$(".alert .confirm-btn").on('click',function(){
			$.ajax({
				url:'',
				dataType:'json',
				data:proarr,
				type:'post',
				success:function(data){
					$(this).parents(".alert").hide();
				},
				error:function(){
				}
			});
		});
	});
	
});