

function define_DataUtils() {
    var DataUtils = {

    };
    
    /**
     * 检测数据是不是除了symbol外的原始数据
     * @param {*} value 
     * @returns 
     */
    DataUtils.isStatic = function (value) {
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            typeof value === 'undefined' ||
            value === null
        )
    }
    /**
     * 检测数据是不是原始数据
     * @param {*} value 
     * @returns 
     */
    DataUtils.isPrimitive = function (value) {
        return isStatic(value) || typeof value === 'symbol'
    }
    return DataUtils;
}

if (typeof (SJT) === 'undefined') {
    console.error("SJT is not defined.");
} else {
    SJT.DataUtils = define_DataUtils();
}



if (typeof (SJT) === 'undefined') {
    console.error("SJT is not defined.");
} else {
    SJT.DataUtils = define_DataUtils();
}





