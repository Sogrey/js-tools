(function(window){
    'use strict';
    window.dbUtil={
    indexedDB :(window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB),

    IDBTransaction :(window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction),

    IDBKeyRange :(window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange),

    IDBCursor : (window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor),            
    idb:null,
    dbName:"",
    dbVersion:"",
    /**
     * 初始化数据库，创建表和建立链接
     * @param  {[type]} dbName    [description]
     * @param  {[type]} dbVersion [description]
     * @param  {[type]} storeObjs [description]
     * @return {[type]}           [description]
     */
    initDB:function (dbName,dbVersion,storeObjs){
        this.dbName = dbName;
        this.dbVersion = dbVersion;

        var dbConnect = this.indexedDB.open(this.dbName,this.dbVersion);

        var self = this;
        dbConnect.onsuccess = function(e){
            self.idb = e.target.result;
            self.log('数据库链接成功！');                
        }
        dbConnect.onerror = function(e){
            console.log(e)
            self.log('数据库链接失败!');
        }
        dbConnect.onupgradeneeded = function(e){
            self.idb = e.target.result;
            var ts = e.target.transaction;
            var oldVersion = e.oldVersion;
            var newVersion = e.newVersion;
            self.log('数据库更新成功，旧的版本号为：'+oldVersion+",新的版本号为："+newVersion);
            if(storeObjs){
                for(var k = 0,len=storeObjs.length;k<len;k++){
                    var storeObj = storeObjs[k];
                    var storeName = storeObj.storeName;
                    var key = storeObj.key;
                    var idxs = storeObj.idxs;

                    self.createTable(storeName,key,idxs)
                }
            }
        }
    },

    /**
     * 创建数据库存储对象（表）
     * @param  {[type]} key [description]
     * @param  {[type]}     [description]
     * @return {[type]}     [description]
     */
    createTable:function(storeName,key,idxs){
        var self = this;
        var idb = self.idb;
        if(!idb){
            self.log('数据库没有链接');
            return ;
        }
        if(!key || !idxs){
            self.log('参数错误');
            return ;
        }
        if(!storeName){
            self.log('storeName必须');
            return ;
        }

        try{
            var store = idb.createObjectStore(storeName,key);
            self.log('数据库存储对象(table)创建成功');
            for(var i = 0;i<idxs.length;i++){
                var idx = idxs[i];
                store.createIndex(idx.indexName,idx.keyPath,idx.optionalParameters);
            self.log('索引'+idx.indexName+'创建成功');
            }
        }catch(e){
            self.log('建表出现错误');
            console.log(JSON.stringify(e))
        }
    },

    /**
     * [add description]
     * @param {[type]} storeName [description]
     * @param {[type]} values    [description]
     */
    add:function(storeName,values){
        var dbConnect = this.indexedDB.open(this.dbName,this.dbVersion);
        var self = this;
        dbConnect.onsuccess = function(e){
            var idb = e.target.result;
            var ts = idb.transaction(storeName,"readwrite");
            var store = ts.objectStore(storeName);
            for(var i = 0;i<values.length;i++){
                (function(i){
                    var value = values[i];
                    var req = store.put(value);
                    req.onsuccess = function(){
                        self.log("添加第"+i+"个数据成功");
                    }
                    req.onerror = function(e){
                        self.log("添加第"+i+"个数据失败");
                        self.log(JSON.stringify(e));
                    }                            
                })(i)

            }
            ts.oncomplete = function(){
                self.log('添加数据事务结束！');
            }
                    
        }

    },

    /**
     * [select description]
     * @param  {[type]}   storeName [description]
     * @param  {[type]}   count     [description]
     * @param  {Function} callback  [description]
     * @param  {[type]}   indexName [description]
     * @return {[type]}             [description]
     */
    select:function(storeName,count,callback,indexName){
        var dbConnect = this.indexedDB.open(this.dbName,this.dbVersion);
        var self = this;
        var total = 0;
        var data = [];
        dbConnect.onsuccess = function(e){
            self.log("数据库链接成功！");
            var idb = e.target.result;
            var ts = idb.transaction(storeName,"readonly");
            var store = ts.objectStore(storeName);
            var req = store.count();
            var req2 = null;
            req.onsuccess = function(){
                total = this.result;
                var realCount = (count<=total)?count:total;
                if(typeof indexName == 'undefined'){
                    var range = IDBKeyRange.bound(0,"9999999999999999999999");
                    req2 = store.openCursor(range,'prev');
                    var cc = 0;
                    req2.onsuccess = function(){
                        var cursor = this.result;
                        if(total == 0){
                            callback([]);
                            return;
                        }
                        if(cursor){                        
                            cc++;
                            data.push(cursor.value);
                            if(cc==realCount){
                                callback(data);
                                return;
                            }
                            cursor.continue();
                        }
                    }
                    req2.onerror = function(){
                        self.log("检索出错")
                    }
                }else{
                    //待写
                }                        
            }

        }
    },

    /**
     * [delete description]
     * @param  {[type]} storeName [description]
     * @param  {[type]} key       [description]
     * @return {[type]}           [description]
     */
    delete:function(storeName,key,callback){
        var dbConnect = this.indexedDB.open(this.dbName,this.dbVersion);
        let self = this;
        dbConnect.onsuccess = function(e){
            var idb = e.target.result;
            var ts = idb.transaction(storeName,'readwrite');
            var store = ts.objectStore(storeName);
            store.delete(key);
            self.log('删除成功！');
            if(callback){
                callback();
            }
        }
    },
    /**
     * [funciton description]
     * @param  {[type]} storeName    [description]
     * @param  {[type]} key          [description]
     * @param  {[type]} existCall    [description]
     * @param  {[type]} notExistCall [description]
     * @return {[type]}              [description]
     */
    isExist:function(storeName,key,existCall,notExistCall){
        var dbConnect = this.indexedDB.open(this.dbName,this.dbVersion);
        dbConnect.onsuccess = function(e){
            var idb = e.target.result;
            var ts = idb.transaction(storeName,'readonly');
            var store = ts.objectStore(storeName);
            var req = store.get(key);
            req.onsuccess = function(){
                if(this.result == undefined){
                    notExistCall();
                }else{
                    existCall(this.result);
                }
            }
            req.onerror = function(){
                notExistCall();
            }
        }
    },
    /**
     * clear
     * @param  {[type]} storeName [description]
     * @return {[type]}           [description]
     */
    clear:function clearObjectStore(storeName){
            var dbConnect = this.indexedDB.open(this.dbName,this.dbVersion);
            dbConnect.onsuccess = function(e){
                var idb = e.target.result;
                var ts = idb.transaction(storeName,'readwrite');
                var store = ts.objectStore(storeName);
                store.clear();
            }        
    },
    /**
     * 删除数据库
     * @param  {[type]} dbName [description]
     * @return {[type]}        [description]
     */
    dropDatabase:function(dbName){
        this.indexedDB.deleteDatabase(dbName);
        this.log('成功删除数据库:'+dbName);
    },
    /**
     * [log description]
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    log:function(msg){
        console.log((new Date()).toTimeString()+":"+msg)
    }

    }

})(window);