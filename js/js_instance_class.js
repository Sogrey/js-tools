/**
 * 可实例化类对象
 * 
 * var tools = new SogreyInstanceTools("test");
 * 
 * //OR
 * 
 * var tools1 = SogreyInstanceTools("test");
 */
var SogreyInstanceTools = (function (window) {
    //匿名
    var __ = function (params) {
        return new __.fn.main(params);
    }

    __.fn = __.prototype = {
        constructor: __,
        main: function (params) {
            this._params = params;
        },
        //功能初始化
        init: function () {
            //TODO
        },
    }

    __.fn.main.prototype = __.fn;

    return __;
})();