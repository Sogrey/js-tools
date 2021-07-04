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

| 方法名| 描述|
|:------|:-----|
|[add](#add-增改)| 增/改|
|[remove](#remove-删)| 删|
|[find](#find-查)| 查|
|[isExist](#isexist-判断是否存在)| 判断是否存在|
|[showAll](#showall-显示所有)| 显示所有|
|[count](#count-计数)| 计数|
|[clear](#clear-清空)| 清空|
|[isEmpty](#isempty-是否为空)| 是否为空|


### add 增/改

{% em color="#dddddd" %}function{% endem %} add(key,value)

参数：

* key 
* value

返回：

* 无

向字典内添加键值对，若已存在指定key，则覆盖原值更新。

### remove 删

{% em color="#dddddd" %}function{% endem %} remove(key)

参数：

* key 

返回：

* 无

移除字典指定key。

### find 查

{% em color="#dddddd" %}function{% endem %} find(key)

参数：

* key 

返回：

* value 指定键对应值

查询字典指定key对应值。

### isExist 判断是否存在

{% em color="#dddddd" %}function{% endem %} isExist(key)

参数：

* key 

返回：

* boolean true存在，false不存在

判断字典内是否存在指定key。

### showAll 显示所有

{% em color="#dddddd" %}function{% endem %} showAll()

参数：

* 无参

返回：

* 无

把字典里所有键值对打印出来。

### count 计数

{% em color="#dddddd" %}function{% endem %} count()

参数：

* 无参

返回：

* int 字典长度

由于字典没有`length`属性,获取`length`为`0`，因此不能使用`length`来获取一个字典的长度，可使用`for-in`遍历的方式获取长度：

``` javascript
    var n = 0;
    for (var key in Object.keys(this.datastore)) {
        ++n;
    }
    console.log("字典长度：" + n);
```

### clear 清空

{% em color="#dddddd" %}function{% endem %} clear()

参数：

* 无参

返回：

* 无

删除字典元素可使用`delete` 来删除。

### isEmpty 是否为空

{% em color="#dddddd" %}function{% endem %} isEmpty()

参数：

* 无参

返回：

* boolean true为空，false不为空

判断字典是否为空，可判断其长度[count()](#count-计数)是否为0，大于0既不为空。