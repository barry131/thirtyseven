/**
 *  购物
 * @copyright 北京宏图世展网络科技服务有限公司
 * @author eub前端
 * @date 20150617
 * @global
 * @namespace shop
 */
'use strict';

(function(root,factory){
    root.shop = factory(root.shop);

    if (typeof define === "function" && define.cmd) {
        define(function (require, exports, module) { 
            return root.shop
        })
      
    }
})(eub,function(shop){
    /**
     * 数量加减
     * @memberOf eub
     * @namespace eub.shop
     * @param {object} obj 传对象 传值给后台
     * @return eub.shop
     * @function
     * @example
     *     var obj = {
     *         "adddom" : $(''),
     *         "addFunction" : function(Number,Boolean){}
     *     }
     *     eub.shop.add(obj);
     */
    shop.add = function(obj){
        obj.adddom.on('click',function(){
			
            var num = $(this).parent().find('.text_box'),
                stock = $(this).attr('data-stock'),
                isnum = stock ? true : false;

            if(isnum){
                if(num.val()*1 >= stock*1) return false;

                num.val(num.val()*1+1);

            }else{
                if(num.val() <= 1) return false;
                num.val(num.val()*1-1);
            }

            if(obj.addFunction){
                obj.addFunction(num.val()*1,isnum,$(this))
            }
        })

        return this;
    }

    return shop;
})
