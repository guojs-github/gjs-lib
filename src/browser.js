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

