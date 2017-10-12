/*
	Web Browser
	2017.10.12 GuoJS
*/

namespace gjs.lib { 
	enum BROWSER_TYPE {
		UNKNOWN	='Unknown',
		OPERA	='Opera',
		FIREFOX	= 'Firefox',
		CHROME	='Chrome',
		SAFARI	='Safari',
		EDGE	='Edge',
		IE		='IE'
	}
	export class browser {
		constructor() {
			// alert("gjs.lib.browser");
		}
		type() { // Get browser type information
			// alert(navigator.userAgent);
			var userAgent:string = navigator.userAgent; //取得浏览器的userAgent字符串  
			var isOpera:boolean = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
			var isIE:boolean = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
			var isIE11:boolean = -1 < userAgent.indexOf("Trident") &&  -1 < userAgent.indexOf("rv") && !isIE;
			var isEdge:boolean = userAgent.indexOf("Edge") > -1 && !isIE11; //判断是否IE的Edge浏览器  
			var isFF:boolean = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
			var isSafari:boolean = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
			var isChrome:boolean = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  
			var reIE:any = null;
			var fIEVersion:any = null;
			
			try {
				if (isIE) { // IE
					 reIE = new RegExp("MSIE (\\d+\\.\\d+);");
					 reIE.test(userAgent);
					 fIEVersion = parseFloat(RegExp["$1"]);
					 if ((7 <= fIEVersion) && ( 11 >= fIEVersion)) return BROWSER_TYPE.IE + fIEVersion;
					 else return BROWSER_TYPE.IE;
				} else if (isIE11)
					return BROWSER_TYPE.IE + "11";			
				else if (isEdge) 
					return BROWSER_TYPE.EDGE;			
				else if (isOpera) 
					return BROWSER_TYPE.OPERA;			
				else if (isFF) 
					return BROWSER_TYPE.FIREFOX;			
				else if (isSafari) 
					return BROWSER_TYPE.SAFARI;			
				else if (isChrome) 
					return BROWSER_TYPE.CHROME;			
				else
					return BROWSER_TYPE.UNKNOWN;	
			} catch(ex) {
				throw ex;
			} finally {
				reIE = null;
				fIEVersion = null;
			} 		
		}// type
		isIE() {  // Is IE browser
			var type:string = this.type();
			
			try {
				if (-1 < type.indexOf(BROWSER_TYPE.IE))
					return true;
				else
					return false;
			} catch(ex) {
				throw ex;
				// return false;
			} finally {
			}
		} // isIE
		
	}// browser
} 