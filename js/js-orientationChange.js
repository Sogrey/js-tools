 /**
     * 手机横竖屏翻转事件添加与移除（默认已存在横竖屏翻转刷新页面）
     * @type {Object}
     */
    var orientationChange = {
        events: {},//给页面初始化一个翻凭函数，即强制页面刷新
        init: false,
        addEvent: function (id, fun) {
            if(orientationChange.events[id]) {
                return false;
            }
            orientationChange.events[id] = fun;
            if(!orientationChange.init) {
                orientationChange.initOrientCommand();
            }
            return true;
        },
        removeEventById: function (id) {
            if(orientationChange.events[id]) {
                delete orientationChange.events[id];
                return true;
            }
            return false;
        },
        initOrientCommand: function () {
            /* 在用户变化屏幕显示方向的时候调用*/
            window.addEventListener('orientationchange', function(e){
                for(var key in orientationChange.events){
                    var tmpFunc = orientationChange.events[key];
                    tmpFunc();
                }
            }, false);
            orientationChange.init = true;
        }
    };