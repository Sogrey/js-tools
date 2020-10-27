; /**静态工具类方法

SogreyTools.test();

*/
(function (SogreyTools) {

    SogreyTools.test = function () {
        console.log('This is a test of SogreyTools!');
    };

    //将科学计数法转换为小数
    SogreyTools.setFloatDecimals = function (num, decimals) {
        return parseFloat(num.toFixed(decimals));
    };

    SogreyTools.defined = function (value) {
        return value !== undefined && value !== null;
    };

    SogreyTools.isEmptyString = function (str) {
        return !SogreyTools.defined(str) || str.length == 0
    };

    SogreyTools.defaultValue = function (a, b) {
        if (a !== undefined && a !== null) {
            return a;
        }
        return b;
    };

    /**
     * 将RGB转换为hex
     * @param {*} rgb 
     */
    SogreyTools.rgbToHex = function (rgb) {

        // rgb(x, y, z)
        var color = [rgb.R, rgb.G, rgb.B];
        var hex = "#";

        for (var i = 0; i < 3; i++) {
            // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
            // 'color[i]' 是数组，要转换成字符串.
            // 如果结果是一位数，就在前面补零。例如:   A变成0A
            hex += ("0" + Number(color[i]).toString(16)).slice(-2);
        }
        return hex;
    };

    // SogreyTools.number2Color(0xffffffff)
    // "rgba(255, 255, 255, 255)"
    SogreyTools.number2Color = function (number) {
        const alpha = number >> 24 & 0xff;
        const red = number >> 16 & 0xff;
        const green = number >> 8 & 0xff;
        const blue = number & 0xff;
        return [red, green, blue, alpha];
    }
    SogreyTools.number2Color2 = function (number) {
        var r = parseInt(number / 65536);
        var g = parseInt((number - r * 65536) / 256);
        var b = ((number - r * 65536) - g * 256);
        return {
            r: r,
            g: g,
            b: b
        };
    }
    SogreyTools.color2Number2 = function (rgbArray) {
        return rgbArray[0] * 65536 + rgbArray[1] * 256 + rgbArray[2];
    }
    // SogreyTools.rgba2Hex([176,114,98,255])
    // "b07262"
    SogreyTools.rgba2Hex = function (rgba) {
        if (rgba.length >= 3) {
            var r = parseInt(rgba[0]);
            var g = parseInt(rgba[1]);
            var b = parseInt(rgba[2]);
            var a = 1;
            // if (rgba.length == 4) { // 带alpha
            //     a = parseInt(rgba[3]);
            // }

            // console.log(((a << 24) + (r << 16) + (g << 8) + b));

            var hex = "" + ((a << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            return hex.toUpperCase();
        }
    }

    //JS 对象排序，根据对象的某一属性 https://github.com/Sogrey/Web-QA/issues/161
    SogreyTools.compareObjectList = function (pro) {
        return function (obj1, obj2) {
            var val1 = obj1[pro];
            var val2 = obj2[pro];
            if (val1 < val2) { //正序
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    /**
     *判断是否是数字
     *
     **/
    SogreyTools.isRealNum = function (val) {
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，    
        if (val === "" || val == null) {
            return false;
        }
        if (!isNaN(val)) {
            //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,   //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
            return true;
        } else {
            return false;
        }
    }

    /**
     * 判断当前页面是否是pc
     */
    SogreyTools.IsPC = function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    /**快速排序 */
    SogreyTools.quickSort = function (arr) {
        if (arr.length <= 1) {
            return arr; //如果数组只有一个数，就直接返回；
        }
        var num = Math.floor(arr.length / 2); //找到中间数的索引值，如果是浮点数，则向下取整
        var numValue = arr.splice(num, 1); //找到中间数的值
        var left = [];
        var right = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < numValue) {
                left.push(arr[i]); //基准点的左边的数传到左边数组
            } else {
                right.push(arr[i]); //基准点的右边的数传到右边数组
            }
        }
        return SogreyTools.quickSort(left).concat(numValue, SogreyTools.quickSort(right)); //递归不断重复比较
    };
    /**深拷贝 */
    SogreyTools.deepCopy = function (source) {
        if (!source || typeof source !== 'object') {
            throw new Error('error');
        }
        var targetObj = source.constructor === Array ? [] : {};
        for (var keys in source) {
            if (source.hasOwnProperty(keys)) {
                if (source[keys] && typeof source[keys] === 'object') {
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = SogreyTools.deepCopy(source[keys]);
                } else {
                    targetObj[keys] = source[keys];
                }
            }
        }
        return targetObj;
    };

})(SogreyTools = {});