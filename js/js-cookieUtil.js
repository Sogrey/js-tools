/**
     * [cookieUtil 操作cookie
     * @type {Object}
     */
    var cookieUtil = {
        /**
         * 增加cookie
         * @param {string} name       cookie名称
         * @param {string} value      值
         * @param {number} expireTime 过期时间，ms
         */
        setCookie:function(name, value, expireTime, path){
            var cookiePath = path ? (";path=" + path) : "";
            var exp = new Date();
            exp.setTime(exp.getTime() + expireTime);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + cookiePath;
        },
        /**
         * 获取cookie
         * @param  {string} name cookie名称
         * @return {string}      值
         */
        getCookie:function(name){
            var arr;
            var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            }else{
                return null;
            }
            return null;
        },

        /**
         * 删除cookie
         * @param  {string} name cookie名称
         */
        delCookie:function(name, path){
            var exp = new Date();
            var cookiePath = path ? (";path=" + path) : "";
            exp.setTime(exp.getTime() - 1000000);
            var cval=cookieUtil.getCookie(name);
            if(cval !== null) {
                document.cookie= name + "="+cval+";expires="+exp.toGMTString() + cookiePath;
            }
        }
    };