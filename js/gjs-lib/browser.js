"use strict";
/*
    Web Browser
    2017.10.12 GuoJS
*/
var gjs;
(function (gjs) {
    var lib;
    (function (lib) {
        var BROWSER_TYPE;
        (function (BROWSER_TYPE) {
            BROWSER_TYPE["UNKNOWN"] = "Unknown";
            BROWSER_TYPE["OPERA"] = "Opera";
            BROWSER_TYPE["FIREFOX"] = "Firefox";
            BROWSER_TYPE["CHROME"] = "Chrome";
            BROWSER_TYPE["SAFARI"] = "Safari";
            BROWSER_TYPE["EDGE"] = "Edge";
            BROWSER_TYPE["IE"] = "IE";
        })(BROWSER_TYPE || (BROWSER_TYPE = {}));
        var browser = /** @class */ (function () {
            function browser() {
                // alert("gjs.lib.browser");
            }
            browser.prototype.type = function () {
                // alert(navigator.userAgent);
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
                var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
                var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
                var isIE11 = -1 < userAgent.indexOf("Trident") && -1 < userAgent.indexOf("rv") && !isIE;
                var isEdge = userAgent.indexOf("Edge") > -1 && !isIE11; //判断是否IE的Edge浏览器  
                var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
                var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
                var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  
                var reIE = null;
                var fIEVersion = null;
                try {
                    if (isIE) {
                        reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                        reIE.test(userAgent);
                        fIEVersion = parseFloat(RegExp["$1"]);
                        if ((7 <= fIEVersion) && (11 >= fIEVersion))
                            return BROWSER_TYPE.IE + fIEVersion;
                        else
                            return BROWSER_TYPE.IE;
                    }
                    else if (isIE11)
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
                }
                catch (ex) {
                    throw ex;
                }
                finally {
                    reIE = null;
                    fIEVersion = null;
                }
            }; // type
            browser.prototype.isIE = function () {
                var type = this.type();
                try {
                    if (-1 < type.indexOf(BROWSER_TYPE.IE))
                        return true;
                    else
                        return false;
                }
                catch (ex) {
                    throw ex;
                    // return false;
                }
                finally {
                }
            }; // isIE
            return browser;
        }()); // browser
        lib.browser = browser;
    })(lib = gjs.lib || (gjs.lib = {}));
})(gjs || (gjs = {}));
//# sourceMappingURL=browser.js.map