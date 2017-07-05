/**
 * 工具
 * @copyright 北京宏图世展网络科技服务有限公司
 * @author eub前端
 * @date 20150617
 * @global
 * @namespace poput
 */
'use strict';

(function(root,factory){
    root.poput = factory(root.poput);

    if (typeof define === "function" && define.cmd) {
        define(function (require, exports, module) { 
            return root.poput
        })
      
    }
})(eub,function(poput){

    /**
     * 弹窗
     * @memberOf eub.alertHtml
     * @namespace eub.poput.alertHtml
     * @param {object} 
     * @function
     * @example
     *     1. eub.poput.alertHtml(obj);
     */
    poput.alertHtml = function(obj){

        if(!obj.htmls) return false;
       
        var $poput = $('<div></div>'),
            $poputcen = $('<div>'+obj.htmls+'</div>'),
            dom = null;

        //$poputcen.html(obj.htmls);
        obj.puputName ? $poput.addClass(obj.puputName) :false;
        obj.puputcenName ? $poputcen.addClass(obj.puputcenName):false;
        $poput.css({
            "position":"fixed",
            "top":0,
            "left":0,
            "width":"100%",
            "height":"100%",
            "background":"rgba(0,0,0,0.5)",
            "z-index":999
        })
        $poputcen.css({
            "position":"absolute",
            "top":0,/*
            "left":"8%",
            "width":"84%",*/
            "z-index":999,
            "border-radius":"5px",
            "background":"#FFF"
        })
        

        $poput.append($poputcen);
        $('body').append($poput);

        $poputcen.css('top',($(window).innerHeight()-$poputcen.innerHeight())/2);
        
        $poputcen.find('.cancel-btn').on('click',function(){
            $poput.remove();
        })

        dom = $poputcen.find('.confirm-btn');

        if(obj.btnupFun){
            obj.btnupFun(dom,$poput);
        };

        if(obj.alertFun){
            obj.alertFun($poput)
        };
    }

    poput._alertHtml = function(text){
        var html = '<p>'+text+'</p>\
                        <div class="alert-btn">\
                            <a href="javascript:;" class="cancel-btn">取消</a>\
                            <a href="javascript:;" class="confirm-btn">确定</a>\
                        </div>';
        return html;
    }


    return poput;
})
