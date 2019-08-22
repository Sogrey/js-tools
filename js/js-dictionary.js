/**
 * js没有字典这个数据类型，js的对象都是键值对的
 * 没有length属性,为0
 * 
 * @author Sogrey https://github.com/Sogrey
 */

function Dictionary() {
    /**
     * 字典的核心数据
     */
    this.datastore = new Array();
    /**
     * 增删改查等的属性方法可以按照下面设置，也可以 Dictionary.prototype.[方法名]=function(){}来设置
     */
    // this.add = add;    
    // this.find = find;
    // this.remove = remove;
    // this.isExist = isExist;
    // this.showAll = showAll;
    // this.count = count;
    // this.clear = clear;
    // this.isEmpty = isEmpty;
}

Dictionary.prototype = {
    /**
     * 增/改
     * @param {String} key 
     * @param {String} value 
     */
    add: function (key, value) {
        this.datastore[key] = value;
    },
    /**
     * 删
     * @param {String} key 
     */
    remove: function (key) {
        delete this.datastore[key];
    },
    /**
     * 查
     * @param {String} key 
     */
    find: function (key) {
        return this.datastore[key];
    },
    /**
     * 是否存在
     * @param {String} key 
     */
    isExist: function (key) {
        return !!this.datastore[key];
    },
    /**
     * 打印所有
     */
    showAll: function () {
        var str = "";
        for (var key in this.datastore) {
            str += key + " -> " + this.datastore[key] + ";  "
        }
        console.log("显示全部：" + str);
    },
    /**
     * 统计总数
     */
    count: function () {
        var n = 0;
        for (var key in Object.keys(this.datastore)) {
            ++n;
        }
        console.log("字典长度：" + n);
        return n;
    },
    /**
     * 清空
     */
    clear: function () {
        for (var key in this.datastore) {
            delete this.datastore[key];
        }
    },
    /**
     * 判断是否为空
     */
    isEmpty: function () {
        console.log(this.count())
        return this.count() === 0
    }
}


