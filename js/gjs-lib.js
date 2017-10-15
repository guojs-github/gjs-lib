/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*
	Library Main Entry
	2017.10.11 GuoJS
*/
// Reference
// import $ from 'expose-loader?$!jquery';	// 导入jQuery
// import '../css/main.css';

// Global Variables
window.gjs = window.gjs || {};
window.gjs.lib = window.gjs.lib || {};
window.gjs.lib.common = __webpack_require__(1)();
window.gjs.lib.browser = __webpack_require__(2)();
window.gjs.lib.services = __webpack_require__(3)();



/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	提供常用功能
	GuoJS 2017/10/15
*/
module.exports = function () {
	var exports = gjs.lib.common;
	return exports;
};

var gjs = gjs || {};
gjs.lib = gjs.lib || {};
gjs.lib.common = ( function() {
	var obj = {
		isEmptyString: function(string) { // 是空字符串
			if (typeof string !== 'string') return true;
			if (null == string) return true;
			if ('' == string.trim()) return true;

			return false;
		},
		isObject: function(object) {
			if (typeof object !== 'object') return false;
			if (null == object) return false;

			return true;
		},
		isId: function(id) { // 无效id
			if (typeof id !== 'number') return false;
			if (null == id) return false;
			if (isNaN(id)) return false;
			if (0 >= id) return false;

			return true;
		},		
		isFunction: function(object) {
			if (typeof object !== 'function') return false;
			if (null == object) return false;

			return true;
		},
		isInteger: function(val) {
			var iVal;
			
			try {
				iVal = parseInt(val);
				if (isNaN(iVal)) return false;
				return true;
			} catch(ex) {
				return false;
			} finally {
				iVal = null;
			}
		}
	};
	
	return obj;
})();



/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	浏览器相关功能
	GuoJS 2017/10/11
*/

module.exports = function () {
	var exports = gjs.lib.browser;
	return exports;
};

var gjs = gjs || {};
gjs.lib = gjs.lib || {};
gjs.lib.browser = ( function() {
	var obj = {
		BROWSER_TYPE: {
			UNKNOWN: 'Unknown',
			OPERA: 'Opera',
			FIREFOX: 'Firefox',
			CHROME: 'Chrome',
			SAFARI: 'Safari',
			EDGE: 'Edge',
			IE: 'IE'
		},
		type: function() { // Return the type of browser
			// alert(userAgent);
			var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
			var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
			var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
			var isIE11 = -1 < userAgent.indexOf("Trident") &&  -1 < userAgent.indexOf("rv") > -1 && !isIE;
			var isEdge = userAgent.indexOf("Edge") > -1 && !isIE11; //判断是否IE的Edge浏览器  
			var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
			var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
			var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  
			var reIE = null;
			var fIEVersion = null;
			
			try {
				if (isIE) { // IE
					 reIE = new RegExp("MSIE (\\d+\\.\\d+);");
					 reIE.test(userAgent);
					 fIEVersion = parseFloat(RegExp["$1"]);
					 if ((7 <= fIEVersion) && ( 11 >= fIEVersion)) return this.BROWSER_TYPE.IE + fIEVersion;
					 else return this.BROWSER_TYPE.IE;
				} else if (isIE11)
					return this.BROWSER_TYPE.IE + "11";			
				else if (isEdge) 
					return this.BROWSER_TYPE.EDGE;			
				else if (isOpera) 
					return this.BROWSER_TYPE.OPERA;			
				else if (isFF) 
					return this.BROWSER_TYPE.FIREFOX;			
				else if (isSafari) 
					return this.BROWSER_TYPE.SAFARI;			
				else if (isChrome) 
					return this.BROWSER_TYPE.CHROME;			
				else
					return this.BROWSER_TYPE.UNKNOWN;				
			} catch(ex) {
				throw ex;
			} finally {
				userAgent = null;  
				isOpera = null;  
				isIE = null;
				isEdge = null;
				isFF = null;
				isSafari = null; 
				isChrome = null;
				reIE = null;
				fIEVersion = null;
			}		
		},
		isIE: function() {  // Is IE browser
			var type = this.type();
			
			try {
				if (-1 < type.indexOf(this.BROWSER_TYPE.IE))
					return true;
				else
					return false;
			} catch(ex) {
				throw ex;
				return false;
			} finally {
				type = null
			}
		},		
		availHeight: function() { // 计算当前浏览器最大化情况下可用高度,不滚动的情况下
			var type = '';
			var height = 0;
			var taskBarHeight = 40; // 任务栏高度
			var screenTop = 0;
			
			try {
				type = this.type();				
				// alert(type);
				// alert(this.isIE());
				if (this.isIE()) { // IE
					screenTop = 108; /* IE, window toolbar+ window menu高度*/
					return screen.availHeight/*屏幕分辨率，去掉任务栏，去掉当前窗口标题栏高度*/ - screenTop/* Chrome caption+toolbar+menu高度*/;
				} else if (this.BROWSER_TYPE.CHROME == type) { // Chrome
					screenTop = 90; /* Chrome, window caption+ window menu + window menu高度*/
					return screen.availHeight/*屏幕分辨率*/ - taskBarHeight - screenTop;
				} else { // Other
					screenTop = 90; /* Chrome, window caption+ window menu + window menu高度*/
					return screen.availHeight/*屏幕分辨率*/ - taskBarHeight - screenTop;
				}
			} catch(e) {
				throw e;
			} finally {
				type = null;
				height = null;
				taskBarHeight = null;
				screenTop = null;
			}
		}
	};
	
	return obj;
})();



/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	提供系统级别的服务
	GuoJS 2017/10/15
*/
module.exports = function () {
	var exports = gjs.lib.services;
	return exports;
};

var gjs = gjs || {};
gjs.lib = gjs.lib || {};
gjs.lib.services = ( function() {
	var obj = {
		post: function(url, onSuccess, onError, timeout) { // Post request
			var common = window.gjs.lib.common;
			// Check
			if ((!common.isInteger(timeout)) || (0 >= timeout))
				timeout = 1000;
			
			// Request
			var ajaxRequest = $.ajax({ 
				url:url, 
				type:"post", //数据发送方式 
				cache:false,
				timeout: timeout, // 请求超时时间设置，单位毫秒
				dataType:'text', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
				error: function(request, status, err){ //失败 
					if (common.isFunction(onError))
						onError(request, status, err);	
				}, 
				success: function(message){ //成功 
					// alert(message);
					// eval('('+ message + ')');		
					if (common.isFunction(onSuccess))
						onSuccess(message);						
				}, 
				complete: function(XMLHttpRequest, status){ //请求完成后最终执行参数
			　　　　if('timeout' == status){ //超时,status还有success,error等值的情况
						ajaxRequest.abort();
					}
				}
			});  // ajax
		},
		get: function(url, onSuccess, onError, timeout) { // Post request
			var common = window.gjs.lib.common;
			// Check
			if ((!common.isInteger(timeout)) || (0 >= timeout))
				timeout = 1000;
			
			// Request
			var ajaxRequest = $.ajax({ 
				url:url, 
				type:"get", //数据发送方式 
				cache:false,
				timeout: timeout, // 请求超时时间设置，单位毫秒
				dataType:'jsonp', //接受数据格式 (这里有很多,常用的有html,xml,js,json) jsonp是支持跨域调用
				error: function(request, status, err){ //失败 
					if (common.isFunction(onError))
						onError(request, status, err);	
				}, 
				success: function(message){ //成功 
					// alert(message);
					// eval('('+ message + ')');		
					if (common.isFunction(onSuccess))
						onSuccess(message);						
				}, 
				complete: function(XMLHttpRequest, status){ //请求完成后最终执行参数
			　　　　if('timeout' == status){ //超时,status还有success,error等值的情况
						ajaxRequest.abort();
					}
				}
			});  // ajax
		}
	};
	
	return obj;
})();



/***/ })
/******/ ]);
//# sourceMappingURL=gjs-lib.js.map