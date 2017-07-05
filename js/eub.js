(function(window,undefined){
    /**
     * 全站命名空间
     * @copyright 北京宏图世展网络科技服务有限公司
     * @author eub前端
     * @date 20150617
     * @global
     * @namespace eub
     */
    var eub = window.eub || (window.eub = {}),
        register,
        tools;

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
            obj = window;

        for(var i=0; i<len; i++){
            obj = obj[namespace[i]] = obj[namespace[i]] || {};
        }
        return obj;
    }

    /**
     * 工具方法
     * @memberOf eub
     * @namespace eub.tools
     */
    tools = register('eub.tools')

    /**
     * ajax判断防止来续请求
     * @memberOf eub
     * @namespace eub.tools.isCAjax
     */
    tools.isCAjax = true;




    /**
     * ajax请求
     * @memberOf eub.tools
     * @namespace eub.tools.ajax
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
     *     eub.tools.ajax("url",datas,function(data){
     *        this is callback;
     *     });
     */
    tools.ajax = function(type, url,datas,callback){

        if(tools.isCAjax == false){//防止连续请求
            return;
        }
        var _date = new Date();
        _date = _date.getTime();//时间戳

        $.ajax({
            type: (type ? type : "get"),
            data: datas,
            dataType: 'json',
            url: url + "?t=" + _date,
            success: function(data){
                if(data.error == 0){
                    if(callback){
                        return callback(data);
                    }
                } else{
                    alert(data.msg);
                }
                tools.isCAjax = true;
            },
            error: function(){
                tools.isCAjax = true;
            }
        });
    }

    /**
     * 添加动画定时器
     * @memberOf eub.tools
     * @namespace eub.tools.delayAni
     * @param {object} obj 传入那个dom元素
     * @param {string} tag 取到的动画的值
     * @param {string} time 取到动画多久之后添加时间
     * @function
     * @example
     *     1. eub.tools.delayAni(obj,tag,time);
     */
    tools.delayAni = function(obj,tag,time){
        setTimeout(function(){
            obj.addClass('animated ' + tag);
        },time)
    }

    /**
     * 添加动画
     * @memberOf eub.tools
     * @namespace eub.tools.delayAni
     * @param {object} dom 传入那个dom元素
     * @param {string} tag 动画属性名称 用于取动画名称
     * @param {string} time 动画时间属性名称 用于去时间
     * @param {function} callback 回调函数
     * @function
     * @example
     *     1. eub.tools.delayAni(obj,tag,time);
     */
    tools.addAni = function(dom,attrName,attrTime,callback){

        var $dom = dom.find('['+attrName+']'),
            attrNames,
            attrTimes;

        if($.isFunction(callback)){
            callback( $dom );
        }

        for(var i=0; i<$dom.length; i++ ){
            attrNames = $dom.eq(i).attr(attrName);
            attrTimes = $dom.eq(i).attr(attrTime) ? $(this).attr(attrTime) : 0 ;
            if($(this).hasClass(attrNames)){
                $(this).removeClass('animated ' + attrNames);
            }

            eub.tools.delayAni($dom.eq(i),attrNames,attrTimes);
        }

    }

    /**
     * 设置cookie
     * @memberOf eub.tools
     * @namespace eub.tools.setCookie
     * @param {string} name cookie名称
     * @param {string} value cookie的值
     * @param {number} seconds 设置cookie存活时间
     * @function
     * @example
     *     1. eub.tools.setCookie(name,value,seconds);
     */
    tools.setCookie = function(name, value, seconds) {
        var expires = "";
        seconds = seconds || 0;   //seconds有值就直接赋值，没有为0

        if (seconds != 0 ) {      //设置cookie生存时间
            var date = new Date();
            date.setTime(date.getTime()+(seconds*1000));
            expires = "; expires="+ date.toGMTString();
        }

        document.cookie = name +"="+ escape(value) + expires+ "; path=/";   //转码并赋值
    }

    /**
     * 获取cookie
     * @memberOf eub.tools
     * @namespace eub.tools.getCookie
     * @param {string} name cookie名称
     * @function
     * @example
     *     1. eub.tools.getCookie(name);
     */
    tools.getCookie = function(name) {
        var nameEQ = name + "=";
        var cookieArr = document.cookie.split(';');    //把cookie分割成组

        for(var i=0; i < cookieArr.length; i++) {
            var c = cookieArr[i];                      //取得字符串

            while (c.charAt(0) == ' ') {          //判断一下字符串有没有前导空格
                c = c.substring(1, c.length);      //有的话，从第二位开始取
            }

            if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name
                return unescape(c.substring(nameEQ.length,c.length));    //解码并截取我们要值
            }
        }
        return false;
    }

    /**
     * 删除cookie
     * @memberOf eub.tools
     * @namespace eub.tools.clearCookie
     * @param {string} name cookie名称
     * @function
     * @example
     *     1. eub.tools.clearCookie(name);
     */
    tools.clearCookie = function(name) {
        this.setCookie(name, "", -1);
    }

    /**
     * 图片预加载
     * @memberOf eub.tools
     * @namespace eub.tools.setCookie
     * @param {object} percentView 是否需要滚动条加载要的话出入dom不需要随便传个
     * @param {object} loadView 关闭loading弹窗
     * @param {function} callbacks 回调函数
     * @function
     * @example
     *     1. eub.tools.setCookie(name);
     */
    tools.execLoadFile = function( percentView, loadView, callbacks ){
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
})(window,undefined)