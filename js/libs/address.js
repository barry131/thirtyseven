/**
 * 工具
 * @copyright 北京宏图世展网络科技服务有限公司
 * @author eub前端
 * @date 20150617
 * @global
 * @namespace address
 */
'use strict';

(function(root,factory){
    root.address = factory(root.address);

    if (typeof define === "function" && define.cmd) {
        define(function (require, exports, module) { 
            return root.address
        })
    }
})(eub,function(address){

    /**
     * 轮播
     * @memberOf eub
     * @namespace eub.address
     * @function
     * @example
     *     eub.address.slit();
     */
    address.slit = function(){
        var $dragBln = false,
            timer = null;

        $(".main_image").touchSlider({
            flexible : true,
            speed : 400,
            btn_prev : $("#btn_prev"),
            btn_next : $("#btn_next"),
            paging : $(".flicking_con a"),
            counter : function (e){
                $(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
            }
        });
        
        $(".main_image").bind("mousedown", function() {
            $dragBln = false;
        });
        
        $(".main_image").bind("dragstart", function() {
            $dragBln = true;
        });
        
        $(".main_image a").click(function(){
            if($dragBln) {
                return false;
            }
        });
        
        timer = setInterval(function(){
            $("#btn_next").click();
        }, 3000);
        
        $(".main_visual").hover(function(){
            clearInterval(timer);
        },function(){
            timer = setInterval(function(){
                $("#btn_next").click();
            },3000);
        });
        
        $(".main_image").bind("touchstart",function(){
            clearInterval(timer);
        }).bind("touchend", function(){
            timer = setInterval(function(){
                $("#btn_next").click();
            }, 3000);
        });
    }
    
    return address;
})
