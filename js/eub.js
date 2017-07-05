(function(window,undefined){
    /**
     * ȫվ�����ռ�
     * @copyright ������ͼ��չ����Ƽ��������޹�˾
     * @author eubǰ��
     * @date 20150617
     * @global
     * @namespace eub
     */
    var eub = window.eub || (window.eub = {}),
        register,
        tools;

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
            obj = window;

        for(var i=0; i<len; i++){
            obj = obj[namespace[i]] = obj[namespace[i]] || {};
        }
        return obj;
    }

    /**
     * ���߷���
     * @memberOf eub
     * @namespace eub.tools
     */
    tools = register('eub.tools')

    /**
     * ajax�жϷ�ֹ��������
     * @memberOf eub
     * @namespace eub.tools.isCAjax
     */
    tools.isCAjax = true;




    /**
     * ajax����
     * @memberOf eub.tools
     * @namespace eub.tools.ajax
     * @param {string} type ���ݷ�����get ���� post
     * @param {string} url �����ַ
     * @param {object} datas ������ ��ֵ����̨
     * @param {functions} callback �ص�����
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

        if(tools.isCAjax == false){//��ֹ��������
            return;
        }
        var _date = new Date();
        _date = _date.getTime();//ʱ���

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
     * ��Ӷ�����ʱ��
     * @memberOf eub.tools
     * @namespace eub.tools.delayAni
     * @param {object} obj �����Ǹ�domԪ��
     * @param {string} tag ȡ���Ķ�����ֵ
     * @param {string} time ȡ���������֮�����ʱ��
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
     * ��Ӷ���
     * @memberOf eub.tools
     * @namespace eub.tools.delayAni
     * @param {object} dom �����Ǹ�domԪ��
     * @param {string} tag ������������ ����ȡ��������
     * @param {string} time ����ʱ���������� ����ȥʱ��
     * @param {function} callback �ص�����
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
     * ����cookie
     * @memberOf eub.tools
     * @namespace eub.tools.setCookie
     * @param {string} name cookie����
     * @param {string} value cookie��ֵ
     * @param {number} seconds ����cookie���ʱ��
     * @function
     * @example
     *     1. eub.tools.setCookie(name,value,seconds);
     */
    tools.setCookie = function(name, value, seconds) {
        var expires = "";
        seconds = seconds || 0;   //seconds��ֵ��ֱ�Ӹ�ֵ��û��Ϊ0

        if (seconds != 0 ) {      //����cookie����ʱ��
            var date = new Date();
            date.setTime(date.getTime()+(seconds*1000));
            expires = "; expires="+ date.toGMTString();
        }

        document.cookie = name +"="+ escape(value) + expires+ "; path=/";   //ת�벢��ֵ
    }

    /**
     * ��ȡcookie
     * @memberOf eub.tools
     * @namespace eub.tools.getCookie
     * @param {string} name cookie����
     * @function
     * @example
     *     1. eub.tools.getCookie(name);
     */
    tools.getCookie = function(name) {
        var nameEQ = name + "=";
        var cookieArr = document.cookie.split(';');    //��cookie�ָ����

        for(var i=0; i < cookieArr.length; i++) {
            var c = cookieArr[i];                      //ȡ���ַ���

            while (c.charAt(0) == ' ') {          //�ж�һ���ַ�����û��ǰ���ո�
                c = c.substring(1, c.length);      //�еĻ����ӵڶ�λ��ʼȡ
            }

            if (c.indexOf(nameEQ) == 0) {       //�����������Ҫ��name
                return unescape(c.substring(nameEQ.length,c.length));    //���벢��ȡ����Ҫֵ
            }
        }
        return false;
    }

    /**
     * ɾ��cookie
     * @memberOf eub.tools
     * @namespace eub.tools.clearCookie
     * @param {string} name cookie����
     * @function
     * @example
     *     1. eub.tools.clearCookie(name);
     */
    tools.clearCookie = function(name) {
        this.setCookie(name, "", -1);
    }

    /**
     * ͼƬԤ����
     * @memberOf eub.tools
     * @namespace eub.tools.setCookie
     * @param {object} percentView �Ƿ���Ҫ����������Ҫ�Ļ�����dom����Ҫ��㴫��
     * @param {object} loadView �ر�loading����
     * @param {function} callbacks �ص�����
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

                //ͼƬԤ�������֮���ֵ����ҳ����Ӧ�Ľṹ
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