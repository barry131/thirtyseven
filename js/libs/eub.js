'use strict';
(function(root,factory){
    root.eub = factory(root);

    if (typeof define === "function" && define.cmd) {
        define(function (require, exports, module) { 
            return root.eub
        })
      
    }

})(this,function(objt){
/**
     * 全站命名空间
     * @copyright 北京宏图世展网络科技服务有限公司
     * @author eub前端
     * @date 20150617
     * @global
     * @namespace eub
     */
    var eub = objt.eub || (objt.eub = {}),
        carousel,
        shop,
        address,
        poput,

    /**
     * 注册空间
     * @param  {string} namespace 要注册的名称, 以 . 分隔
     * @return {object}           注册后的空间对象
     * @name eub.register
     * @memberOf eub
     * @function
     * @example
     *     1, eub.register("eub.dell") => {};
     *     2, eub.register("eub.canon") => {};
     *     3, eub.register("eub.kindle") => {};
     */
    register = eub.register = function(namespace){
        var namespace = namespace.split('.'), //把字符串转数组
            len = namespace.length, //一看就知道 数组长度
            obj = objt;

        for(var i=0; i<len; i++){
            obj = obj[namespace[i]] = obj[namespace[i]] || {};
        }
        return obj;
    }

    /**
     * 轮播命名空间
     * @memberOf eub
     * @namespace eub.carousel
     * @function
     * @example
     *     eub.carousel();
     */
    carousel = eub.register('eub.carousel');

    /**
     * 轮播初始
     * @memberOf eub
     * @namespace eub.carousel
     * @param {functions} callback 回调函数
     * @function
     * @example
     *     eub.carousel.init(callback);
     */
    carousel.init = function(callback){

        if(callback){
            callback(this,eub);
        }
    }
     /**
     * 购物组件
     * @memberOf eub
     * @namespace eub.shop
     * @function
     * @example
     *     eub.shop();
     */
    shop = eub.register('eub.shop');


    /**
     * 购物初始
     * @memberOf eub
     * @namespace eub.shop
     * @param {functions} callback 回调函数
     * @function
     * @example
     *     eub.shop.init(callback);
     */
    shop.init = function(callback){

        if(callback){
            callback(this,eub);
        }
    }
    

    /**
     * 地址组件
     * @memberOf eub
     * @namespace eub.address
     * @function
     * @example
     *     eub.address();
     */
    address = eub.register('eub.address');


    /**
     * 地址初始
     * @memberOf eub
     * @namespace eub.address
     * @param {functions} callback 回调函数
     * @function
     * @example
     *     eub.address.init(callback);
     */
    address.init = function(callback){

        if(callback){
            callback(this,eub);
        }
    }

    /**
     * 弹窗组件
     * @memberOf eub
     * @namespace eub.poput
     * @function
     * @example
     *     eub.poput();
     */
    poput = eub.register('eub.poput');


    /**
     * 弹窗初始
     * @memberOf eub
     * @namespace eub.poput
     * @param {functions} callback 回调函数
     * @function
     * @example
     *     eub.poput.init(callback);
     */
    poput.init = function(callback){

        if(callback){
            callback(this,eub);
        }
    }
    return eub;
})

// (function(window){
    
    
// })(window,undefined)