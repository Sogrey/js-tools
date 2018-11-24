/**
 * [cookieUtil 操作cookie
 * @type {Object}
 */
; (function (win) {
    var cookieUtil = {
        /**
         * 增加cookie
         * @param {string} name       cookie名称
         * @param {string} value      值
         * @param {number} expireTime 过期时间，ms
         */
        setCookie: function (name, value, expireTime) {
            var exp = new Date();
            exp.setTime(exp.getTime() + expireTime);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        /**
         * 获取cookie
         * @param  {string} name cookie名称
         * @return {string}      值
         */
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        /**
         * 删除cookie
         * @param  {string} name cookie名称
         */
        delCookie: function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1000000);
            var cval = cookieUtil.getCookie(name);
            if (cval !== null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() ;
            }
        }
    };
    win.cookieUtil = cookieUtil;
})(window);