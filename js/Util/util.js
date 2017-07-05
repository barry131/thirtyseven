/**
 * 工具
 * @copyright 北京宏图世展网络科技服务有限公司
 * @author eub前端
 * @date 20150617
 * @global
 * @namespace util
 */
'use strict';

(function(root,factory){
    root.util = factory(window.util || {});

    if (typeof define === "function" && define.cmd) {
        define(function (require, exports, module) { 
            return root.util
        })
      
    }
})(this,function(util){
    /**
     * ajax弹窗
     * @memberOf util
     * @namespace util._ajaxpoput
     * @function
     * @example
     *     util._ajaxpoput();
     */
    util._ajaxpoput = function(){

        var $div = $('<div class="ajaxpoput"></div>');

        $div.css({
            "position":"fixed",
            "top":0,
            "left":0,
            "width":"100%",
            "height":"100%",
            "background":"url(images/loding.gif) no-repeat center",
            "background-size":"15%",
            "z-index":9999
        })

        $('body').append($div);
       
        return $div;
    }
    util.ajax = true;
    /**
     * ajax请求
     * @memberOf util
     * @namespace util.ajax
     * @param {string} type 传递方法是get 或者 post
     * @param {string} url 请求地址
     * @param {object} datas 传对象 传值给后台
     * @param {functions} callback 回调函数
     * @function
     * @example
     *     var datas = {
     *         "data1" : "data1",
     *         "data2" : "data2"
     *     }
     *     util.ajax("url",datas,function(data){
     *        this is callback;
     *     });
     */
    util.ajax = function(type, url,datas,callback){

        if(!util.ajax) return false;
        util.ajax = false;
        var _date = new Date(),
            v = url.indexOf('?') !== -1 ? '&t=' : '?t=',
            _date = _date.getTime(),
            _div = util._ajaxpoput();//时间戳
            
        $.ajax({
            type: (type ? type : "get"),
            data: datas,
            dataType: 'json',
            url: url + v + _date,
            success: function(data){
                util.ajax = true;
                if(callback){
                    _div.remove();
                    return callback(data);
                }
            },
            error: function(){
                util.ajax = true;
                _div.remove();
            }
        });
    }

 

    /**
     * 图片预加载
     * @memberOf util
     * @namespace util.setCookie
     * @param {object} percentView 是否需要滚动条加载要的话出入dom不需要随便传个
     * @param {object} loadView 关闭loading弹窗
     * @param {function} callbacks 回调函数
     * @function
     * @example
     *     1. util.setCookie(name);
     */
    util.execLoadFile = function( percentView, loadView, callbacks ){
        var self = this;
        var loadCallback = callbacks;

        // if(self.getCookie("needLoad")){
        //     return;
        // }

        var sourceArr = [];
        var $src = $("[data-src]");

        for(var i = 0; i < $src.length; i++){
            sourceArr.push($src.eq(i).attr("data-src"));
        }

        var loadImage = function ( path, callback ) {
            var img = new Image();
            img.onload = function () {
                img.onload = null;
                callback( path );

                //图片预加载完成之后把值赋给页面相应的结构
                var $img = $("img[data-src='"+ path +"']");
                var $imgLen = $img.length;

                for(var i = 0; i < $imgLen; i++){
                    $img.eq(i)[0].src = path;
                }
            };
            img.src = path;
        };
        var imgLoader = function ( imgs, callback ) {
            var len = imgs.length, i = 0;
            while ( imgs.length ) {
                loadImage( imgs.shift(), function ( path ) {
                    callback( path, ++i, len );
                } );
            }
        };

        imgLoader( sourceArr, function ( path, curNum, total ) {
            var percent = curNum / total;
            if(percentView){
                percentView.innerHTML = Math.floor( percent * 100 ) + "%";
                if ( percent == 1 ) {
                    setTimeout( function(){
                        $(loadView).slideUp();
                        loadCallback && loadCallback();
                        self.setCookie("needLoad", "true", 1800);
                    }, 500 );
                }
            }
        });
    }
    /**
     * 小数点计算
     * @memberOf util
     * @namespace util.fmoney
     * @param {object} s 是否需要滚动条加载要的话出入dom不需要随便传个
     * @param {object} n 关闭loading弹窗
     * @return 数字
     * @function
     * @example
     *     1. util.fmoney(name);
     */
    util.fmoney= function(s, n){ //s:传入的float数字 ，n:希望返回小数点几位   （数字）
        n = n > 0 && n <= 20 ? n : 2; 
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
        var l = s.split(".")[0].split("").reverse(), 
        r = s.split(".")[1]; 
        var t = ""; 
        for(var i = 0; i < l.length; i ++ ) 
        { 
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
        } 
        // return t.split("").reverse().join("") + "." + r; 
        return parseFloat(s.replace(/[^\d\.-]/g, ""));
    }

    /**
     * 小数点计算
     * @memberOf util
     * @namespace util.fmoney
     * @param {object} s 是否需要滚动条加载要的话出入dom不需要随便传个
     * @param {object} n 关闭loading弹窗
     * @return 数字
     * @function
     * @example
     *     1. util.fmoney(name);
     */
    util.rmoney = function(s, n){ //s:传入的float数字 ，n:希望返回小数点几位  （字符）
        n = n > 0 && n <= 20 ? n : 2; 
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
        var l = s.split(".")[0].split("").reverse(), 
        r = s.split(".")[1]; 
        var t = ""; 
        for(var i = 0; i < l.length; i ++ ) 
        { 
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
        } 
        // return t.split("").reverse().join("") + "." + r; 
        return t.split("").reverse().join("") + "." + r; 
    },
	util.tmoney = function(inplen){ //计算全部金额   inplen: 传入所有商品的个数
		var total = 0;
		for(var i = 0; i < inplen; i++){
			total = util.fmoney(total,2) + (util.rmoney($(".price-one:eq(" + i + ")").text(),2) * util.rmoney($(".pro-num:eq(" + i + ")").val(),2));
		}
		return total.toFixed(2);
	},
	util.aORmmoney = function(p,n,b,total){ //p:传入的单价,n:传入的数量,b:加或减 true加 false减 total:传入总价
		//var total = $(".totalprice").text();
		if(b){
			total = util.fmoney(total,2) + (util.fmoney(p,2)*n);
		}else{
			total = util.fmoney(total,2) - (util.fmoney(p,2)*n);
		}
		return total.toFixed(2);
	}
    return util;
})
