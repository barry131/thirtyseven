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
 
    var details = eub.register('eub.details')

    details.tab = function(){
        $(".co li a").click(function(){   //点击切换商品颜色
            $(this).toggleClass("red").parent().siblings().find('a').removeClass('red');
        });
    }

    details.joinSCUp = function(){
		$('.joinShopingcart').on('click',function(){

			var url = '',
				datas = {
					id:$(this).attr('data-id'),
					color: $(".co li").find('.red').parent().attr('data-aid'),
					mon:$('.mon span').html()
				};
			   
				
			//util.ajax('post',url,datas,function(data){

				poput.alertHtml({
					htmls:'<p>商品成功加入购物车！</p>',
					puputName:'alert',
					puputcenName:'alertinfo',
					alertFun:function(dom){
						setTimeout(function(){
							dom.remove();
						},2000)
					}
				});

				$('.com-border7').html($('.com-border7').html()*1+1);
			//})
		})
	}

    details.init = function(){
        details.tab();
        details.joinSCUp();
        shop.add({adddom:$('#min-add .add')}).add({adddom:$('#min-add .min')})
    }

    exports.init = function () {
        details.init();
        
    }

})

