# js-dictionary.js 字典

Javascript 的数组Array,既是一个数组，也是一个字典(Dictionary)。

数组的定义：

``` javascript
var arr = new Array();
//或者
var arr = ["Apple","OPPO","VIVE"];
```

其实如上定义的数组也是字典，他有默认的key ： `0,1,2,3...`,正因为这样，我们在遍历的时候使用 `ayy[i]` ,`i` 是下标，即就是 `0,1,2,3...`，所以有了：

``` javascript
var arr = ["Apple","OPPO","VIVE"];//特殊的字典,它的key是 0,1,2,3
console.log(arr[0]);

>Apple
//key=0,value="Apple"
```

字典的定义：

``` javascript
var arr = new Array();
arr["a"]="Apple";
arr["o"]="OPPO";
arr["v"]="VIVO";
```
键值对定义，类似于 Java 中的 Map,

字典的简化定义：

``` javascript
//字典的简化风格方式,注意它的类型就不是Array了，而是Json对象
var dic = { "a": "Apple", "o": "OPPO","v": "VIVO" }; 
console.log(dic["a"]);
>Apple 
```

js-dictionary.js 是将字典的一个简单封装，源码在这:[传送门](https://github.com/Sogrey/js-tools/blob/master/js/js-dictionary.js)

一下对外放出几个常用的方法方便字典的增删改查操作。

### add 增/改

### remove 删

### find 查

### isExist 判断是否存在

### showAll 显示所有

### count 计数

### clear 清空

### isEmpty 是否为空