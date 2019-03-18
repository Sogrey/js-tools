// 遍历整个数组，移除匹配item的元素，使用强比较===，给第二个参数的话就从头开始找到第一个匹配item元素移除后返回；
// 如有找到元素返回处理后的数组自身，如果没有找到过就返回undefined;
Array.prototype.Remove = function (item, all) {
    var result, isType = Object.prototype.toString,
        i, len, start, hasLast = arguments[2];
    start = 0, len = this.length;
    for (i = start; i < len;) {
        var isPass = true,
            inx;
        if (!hasLast) {
            inx = i;
        } else {
            inx = len - 1;
        }
        if (isType.call(item) == '[object Array]') {
            for (var ii = 0, iimax = item.length; ii < iimax; ii++) {
                if (this[inx] === item[ii]) {
                    isPass = false;
                    break;
                }
            }
        } else if (this[inx] === item) {
            isPass = false;
        }
        if (!isPass) {
            result = true;
            this.splice(inx, 1);
            if (all) {
                break;
            }
        } else if (!hasLast) {
            len = this.length;
            i++;
        } else {
            len--;
        }
    }
    return result ? this : void 0;
}
// 同上面的Rmove,从尾部开始查找，找到后删除第一个匹配的立刻返回；
// 如有找到元素返回处理后的数组自身，如果没有找到过就返回undefined;
Array.prototype.LastRemove = function (item) {
    /* var result = [], isType = Object.prototype.toString.call,isFrist;
     for (var i = this.length - 1; i >= 0; i--) {
     var isPass = true;
     if (Object.prototype.toString.call(item) == '[object Array]') {
     for (var ii = 0, iimax = item.length; ii < iimax; ii++) {
     if (this[i] === item[ii]) {
     isPass = false;
     break;
     }
     }
     } else if (this[i] === item) {
     isPass = false;
     }
     if (!isPass) {
     if(isFrist && !all){
     break ;
     }
     isFrist = true;
     this.splice(i, 1);
     }
     }*/
    return this.Remove(item, true, true);
}
// 效果同上面的，遍历整个数组，区别是于 返回的是个新的数组，是原数组的引用；
Array.prototype.RemoveAt = function (item) {
    var result = [],
        isType = Object.prototype.toString,
        isPass, val;
    for (var inx = 0, len = this.length; inx < len; inx++) {
        isPass = true;
        val = this[inx];
        if (isType.call(item) == '[object Array]') {
            for (var ii = 0, iimax = item.length; ii < iimax; ii++) {
                if (val === item[ii]) {
                    isPass = false;
                    break;
                }
            }
        } else if (val === item) {
            isPass = false;
        }
        if (isPass) {
            result.push(val);
        }
    }
    return result;
}
//Array.prototype.push.apply(arr1,arr2)；
//以上方法合并两个集合，使用简单优雅，但有参数长度限制,大约是 25W
Array.prototype.pushApply = function(array){
    if(array instanceof Array){
        for(var i=0;i<array.length;i++){
            this.push(array[i]);
        }
    }
}