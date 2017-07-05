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
     * ȫվ�����ռ�
     * @copyright ������ͼ��չ����Ƽ��������޹�˾
     * @author eubǰ��
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
     * ע��ռ�
     * @param  {string} namespace Ҫע�������, �� . �ָ�
     * @return {object}           ע���Ŀռ����
     * @name eub.register
     * @memberOf eub
     * @function
     * @example
     *     1, eub.register("eub.dell") => {};
     *     2, eub.register("eub.canon") => {};
     *     3, eub.register("eub.kindle") => {};
     */
    register = eub.register = function(namespace){
        var namespace = namespace.split('.'), //���ַ���ת����
            len = namespace.length, //һ����֪�� ���鳤��
            obj = objt;

        for(var i=0; i<len; i++){
            obj = obj[namespace[i]] = obj[namespace[i]] || {};
        }
        return obj;
    }

    /**
     * �ֲ������ռ�
     * @memberOf eub
     * @namespace eub.carousel
     * @function
     * @example
     *     eub.carousel();
     */
    carousel = eub.register('eub.carousel');

    /**
     * �ֲ���ʼ
     * @memberOf eub
     * @namespace eub.carousel
     * @param {functions} callback �ص�����
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
     * �������
     * @memberOf eub
     * @namespace eub.shop
     * @function
     * @example
     *     eub.shop();
     */
    shop = eub.register('eub.shop');


    /**
     * �����ʼ
     * @memberOf eub
     * @namespace eub.shop
     * @param {functions} callback �ص�����
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
     * ��ַ���
     * @memberOf eub
     * @namespace eub.address
     * @function
     * @example
     *     eub.address();
     */
    address = eub.register('eub.address');


    /**
     * ��ַ��ʼ
     * @memberOf eub
     * @namespace eub.address
     * @param {functions} callback �ص�����
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
     * �������
     * @memberOf eub
     * @namespace eub.poput
     * @function
     * @example
     *     eub.poput();
     */
    poput = eub.register('eub.poput');


    /**
     * ������ʼ
     * @memberOf eub
     * @namespace eub.poput
     * @param {functions} callback �ص�����
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