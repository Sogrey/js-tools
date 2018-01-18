/**
     * 页面符层
     * @type {Object}
     */
    var overlayLayer = {
        // 判断是否位于‘iphone’下的手百
        judgeInBaiduBoxIphone: function() {
            
        },
        // 显示“加载中”符层
        displayLoadingLayer: function(isVisible, text) {
            if(isVisible) return; // 此处判断如果位于Iphone下的手百要屏蔽自身‘加载中’
            overlayLayer.closeAllLayers();
            text = (text) ? text : '正在加载...';
            var loadingLayer = '<div class="loading-inner">' +
                    '<img class="loading-gif" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMDZhNzZmOC0zMjdjLTQ0YTctOWZmNC03ZmE4YTk4OGIwNDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDcxQUUxNDYyM0VCMTFFNkJDQzNCMUY3MTYxOTI3MEEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDcxQUUxNDUyM0VCMTFFNkJDQzNCMUY3MTYxOTI3MEEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MmE3YTExMS1mMjE4LTQyNjYtOWNlOS1iMjc1MGZmMDRiMWMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0N2E2ODNhZi02NDc4LTExNzktOTkxNi05NjdkNzc4YjQxMjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4I4uQIAAAD4klEQVR42syZX2jNYRjHf+c4+2eWjCmz3RCbsgtaohFFQkTiglAkJaJc2I0LLiZFaFdcCCklJcIKJWGkyPzbrsY2ttZWm/3F/vx+vo++7zy9fptzzs7Zb099drY65/19z/M+7/O8z7OQ53lOHBYGxWAFX+eCWWASaAfnwTPQAzpAK/gOYn5YKEaBuWA/2A7y5fOKsHpfG9hjnkF+gq+gFvyI9oGRKN83FRwDu0E6H6jNG2Zd/b4MUEBv14FP4FciPLgZlINs5Q3tmUFQz4eJgG5wBrwGmfRsyOezfeAtaIhXoHjhNNhrPUDoArfBLfCcooZbQ7w/E+SBVJ+1avllvFgEynZcAWt9hJ0FF0BnjPGeAmaDQpBm7UITqAQD0QicAK6BdZa4h+AAaHZGZ+k8+XnW+o3gKXDtdGHbSbCGLvf4gRNgSwLEOTzNEhbvLYGSFRb9z4ObwCXrBB6mR5NhsuVLLKHixS9+HpwCTinPCWVJFOfwgFRZAhczDP4ReJSpxKW4BzwQybaP4JsSKAd0oS1Q0sAO5Tk5oUfiKU1x2kvQr0QWsGwOCdzJnGW8V56gAxGtSen7oASKlnlGYJjVwlXeu+yMvdUwDxqRUhJDIm4+LwFme+/EkYQTYbLFn1VpzAI58keJ8p68VjjBWZ26GclrXoQeNN6Twv8qQIHNVgmcHuZF03hQbiW9AQrsZ703HsyWX3LU9tY7wVuXOryZEWZtU6A7x4FAnQ/TIyr+nDFMzCPeUVV+/pNmuulB12TvgC1DbfGA/GhRMThjHAicrAT2hnmjMKc4n98gKEthi2BisD3M7spscUjfJAKwPNZh48GWMBOzp0SuDFBgoRInNMiPavYDRuRqtotjbamsauYUSz5sClPUPRWHE8HWAAQW89mmikjoeSbf3GDjbbZ5F4N1rCyTcx6ztR575aGE2Mom3HhR8mGpz4gjWbaR2cOc3ipT1XRPcpGTKePFZWwDkm0ljD3jPWlLH/s1TR0cdeiubh8b+GSZpLT11vymQt+o7Mb9kdpqc4Eo5bgt0dstMbeNkwxzct+Ad9GMPsroek/FpQwkzzEMRmNZzBJF1k2+mj34YDTDI7mCHWcT7VkN1XVwP5YhJE0GRks5VkmzxEnDdJVXrZjGb4cYI65VbUToE06kavwWVmvMAQuY5zLUGmbNSobVYLwDTCl9B5mrXB+xfRyfNdGrLquC3NSnMbZcn8/KNe8m425UE1aHIxFp7lepROrGiXj7Bbg7wuAzZoHGxCMbwHIOm2IR2s4Rh4RGW9TX6zj/DWE6/yJ2hbm8aJrg76GgRufvwLzOHk5GY78FGADUS00Yx6G9xQAAAABJRU5ErkJggg==">' +
                    '<div class="loading-text">' + text + '</div>' +
                '</div>';

            var outterElement = document.createElement('div');
            outterElement.className = "loading-outter";
            outterElement.innerHTML = loadingLayer;

            if(document.getElementsByClassName("loading-outter").length === 1) {
                document.getElementsByClassName("loading-outter")[0].style.display = "-webkit-box";
            } else {
                document.body.appendChild(outterElement);
            }
        },
        // 显示“totast提示(icon, msg形式)”符层
        displayTotastLayer: function(msg, time, iconFlag, timeoutCallback) {
            overlayLayer.closeAllLayers();
            iconFlag = (typeof iconFlag == "boolean") ? iconFlag : false;
            timeoutCallback = (timeoutCallback != undefined && typeof timeoutCallback == "function") ? timeoutCallback : function(){};
            var totastImgVisible = (iconFlag) ? "display: block;" : "display: none;";
            console.log(totastImgVisible);
            var imgHtml = '<img class="totast-gif" style="' + totastImgVisible + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMDZhNzZmOC0zMjdjLTQ0YTctOWZmNC03ZmE4YTk4OGIwNDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDcxQUUxNDYyM0VCMTFFNkJDQzNCMUY3MTYxOTI3MEEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDcxQUUxNDUyM0VCMTFFNkJDQzNCMUY3MTYxOTI3MEEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MmE3YTExMS1mMjE4LTQyNjYtOWNlOS1iMjc1MGZmMDRiMWMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0N2E2ODNhZi02NDc4LTExNzktOTkxNi05NjdkNzc4YjQxMjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4I4uQIAAAD4klEQVR42syZX2jNYRjHf+c4+2eWjCmz3RCbsgtaohFFQkTiglAkJaJc2I0LLiZFaFdcCCklJcIKJWGkyPzbrsY2ttZWm/3F/vx+vo++7zy9fptzzs7Zb099drY65/19z/M+7/O8z7OQ53lOHBYGxWAFX+eCWWASaAfnwTPQAzpAK/gOYn5YKEaBuWA/2A7y5fOKsHpfG9hjnkF+gq+gFvyI9oGRKN83FRwDu0E6H6jNG2Zd/b4MUEBv14FP4FciPLgZlINs5Q3tmUFQz4eJgG5wBrwGmfRsyOezfeAtaIhXoHjhNNhrPUDoArfBLfCcooZbQ7w/E+SBVJ+1avllvFgEynZcAWt9hJ0FF0BnjPGeAmaDQpBm7UITqAQD0QicAK6BdZa4h+AAaHZGZ+k8+XnW+o3gKXDtdGHbSbCGLvf4gRNgSwLEOTzNEhbvLYGSFRb9z4ObwCXrBB6mR5NhsuVLLKHixS9+HpwCTinPCWVJFOfwgFRZAhczDP4ReJSpxKW4BzwQybaP4JsSKAd0oS1Q0sAO5Tk5oUfiKU1x2kvQr0QWsGwOCdzJnGW8V56gAxGtSen7oASKlnlGYJjVwlXeu+yMvdUwDxqRUhJDIm4+LwFme+/EkYQTYbLFn1VpzAI58keJ8p68VjjBWZ26GclrXoQeNN6Twv8qQIHNVgmcHuZF03hQbiW9AQrsZ703HsyWX3LU9tY7wVuXOryZEWZtU6A7x4FAnQ/TIyr+nDFMzCPeUVV+/pNmuulB12TvgC1DbfGA/GhRMThjHAicrAT2hnmjMKc4n98gKEthi2BisD3M7spscUjfJAKwPNZh48GWMBOzp0SuDFBgoRInNMiPavYDRuRqtotjbamsauYUSz5sClPUPRWHE8HWAAQW89mmikjoeSbf3GDjbbZ5F4N1rCyTcx6ztR575aGE2Mom3HhR8mGpz4gjWbaR2cOc3ipT1XRPcpGTKePFZWwDkm0ljD3jPWlLH/s1TR0cdeiubh8b+GSZpLT11vymQt+o7Mb9kdpqc4Eo5bgt0dstMbeNkwxzct+Ad9GMPsroek/FpQwkzzEMRmNZzBJF1k2+mj34YDTDI7mCHWcT7VkN1XVwP5YhJE0GRks5VkmzxEnDdJVXrZjGb4cYI65VbUToE06kavwWVmvMAQuY5zLUGmbNSobVYLwDTCl9B5mrXB+xfRyfNdGrLquC3NSnMbZcn8/KNe8m425UE1aHIxFp7lepROrGiXj7Bbg7wuAzZoHGxCMbwHIOm2IR2s4Rh4RGW9TX6zj/DWE6/yJ2hbm8aJrg76GgRufvwLzOHk5GY78FGADUS00Yx6G9xQAAAABJRU5ErkJggg==">';
            var totastLayer = '<div class="totast-inner" unselectable="on" style="-moz-user-select:none;-webkit-user-select:none;" onselectstart="return false;">' +
                     imgHtml +
                    '<div class="totast-text">' + msg + '</div>' +
                '</div>';
            var outterElement = document.createElement('div');
            outterElement.className = "totast-outter";
            outterElement.innerHTML = totastLayer;
            if(document.getElementsByClassName("totast-outter").length === 1) {
                document.getElementsByClassName("totast-gif")[0].style.display = (iconFlag) ? "block" : "none";
                document.getElementsByClassName("totast-text")[0].innerHTML = msg;
                document.getElementsByClassName("totast-outter")[0].style.display = "-webkit-box";
            } else {
                document.body.appendChild(outterElement);
            }
            setTimeout(function(){
                overlayLayer.closeTotastLayer();
                timeoutCallback();
            }, time);
        },
        // 显示提示符层2
        displayTotastLayer2: function(msg, btnText, clickCallback) {
            overlayLayer.closeAllLayers();
            clickCallback = (clickCallback != undefined && typeof clickCallback == "function") ? clickCallback : function(){};
            document.body.style.overflow = "hidden";
            var totast2Layer = '<div class="totast2-inner" unselectable="on" style="-moz-user-select:none;-webkit-user-select:none;" onselectstart="return false;">' +
                '<div class="totast2-text">' + msg + '</div>' +
                '<div class="totast2-btn">' + btnText + '</div>' +
            '</div>';
            var outterElement = document.createElement('div');
            outterElement.className = "totast2-outter";
            outterElement.innerHTML = totast2Layer;
            if(document.getElementsByClassName("totast2-outter").length === 1) {
                document.getElementsByClassName("totast2-text")[0].innerHTML = msg;
                document.getElementsByClassName("totast2-btn")[0].innerHTML = btnText;
                document.getElementsByClassName("totast2-outter")[0].style.display = "-webkit-box";
            } else {
                document.body.appendChild(outterElement);
            }
            // 对“我知道了”执行事件绑定
            document.getElementsByClassName('totast2-btn')[0].onclick = function() {
                overlayLayer.closeTotastLayer2();
                document.body.style.overflow = "";
                clickCallback();
            };
        },
        // 显示提示符层3
        displayTotastLayer3: function(msg, titleName, confirmText, cancelText, confirmCallback, cancelCallback, options) {
            overlayLayer.closeAllLayers();
            options = (typeof options === 'object') ? options : {};
            var _options = {
                'confirmColor': '#222222',
                'cancleColor': '#222222'
            };
            _options.confirmColor = (typeof options.confirmColor === "string") ? options.confirmColor : _options.confirmColor;
            _options.cancleColor = (typeof options.cancleColor === "string") ? options.cancleColor : _options.cancleColor;
            document.body.style.overflow = "hidden";
            var totast3Layer = '<div class="totast3-inner" unselectable="on" style="-moz-user-select:none;-webkit-user-select:none;" onselectstart="return false;">' +
                '<div class="totast3-title">' + titleName + '</div>' +
                '<div class="totast3-text">' + msg + '</div>' +
                '<div class="totast3-bottom-outter">' +
                    '<div class="totast3-confirm" style="color: ' + _options.confirmColor + '">' + confirmText + '</div>' +
                    '<div class="totast3-cancle" style="color: ' + _options.cancleColor + '">' + cancelText + '</div>' +
                '</div>' +
            '</div>';
            var outterElement = document.createElement('div');
            outterElement.className = "totast3-outter";
            outterElement.innerHTML = totast3Layer;
            if(document.getElementsByClassName("totast3-outter").length === 1) {
                document.getElementsByClassName("totast3-text")[0].innerHTML = msg;
                document.getElementsByClassName("totast3-outter")[0].style.display = "-webkit-box";
            } else {
                document.body.appendChild(outterElement);
            }
            
            // 对“确定”执行事件绑定 
            document.getElementsByClassName('totast3-confirm')[0].onclick = function() {
                document.getElementsByClassName('totast3-outter')[0].style.display = 'none';
                document.body.style.overflow = "";
                confirmCallback();
            };
            // 对“取消”执行事件绑定
            document.getElementsByClassName('totast3-cancle')[0].onclick = function() {
                document.getElementsByClassName('totast3-outter')[0].style.display = 'none';
                document.body.style.overflow = "";
                cancelCallback();
            };
        },
        // 关闭“加载中”符层
        closeLoadingLayer: function() {
            if(document.getElementsByClassName("loading-outter").length === 1) {
                document.getElementsByClassName("loading-outter")[0].style.display = "none";
            }
        },
        // 关闭“符层”符层
        closeTotastLayer: function() {
            if(document.getElementsByClassName("totast-outter").length === 1) {
                document.getElementsByClassName("totast-outter")[0].style.display = "none";
            }
        },
        // 关闭“符层”符层
        closeTotastLayer2: function() {
            if(document.getElementsByClassName("totast2-outter").length === 1) {
                document.getElementsByClassName("totast2-outter")[0].style.display = "none";
            }
        },
        // 关闭“符层”符层
        closeTotastLayer3: function() {
            if(document.getElementsByClassName("totast3-outter").length === 1) {
                document.getElementsByClassName("totast3-outter")[0].style.display = "none";
            }
        },
        closeAllLayers: function() {
            overlayLayer.closeLoadingLayer();
            overlayLayer.closeTotastLayer();
            overlayLayer.closeTotastLayer2();
            overlayLayer.closeTotastLayer3();
        }
    };
