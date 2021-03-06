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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
		},
		getQueryStringByName: function(name) { // 分析字符串获取指定参数值
			var reg = new RegExp('[\?\&]' + name + '=([^\&]+)', 'i');
			var result = window.location.search.match(reg);
			if ( null == result || 1 > result.length) {
				return "";
			}
			return result[1];
		},
		formatTime: function(time) { // 格式化时钟显示
			if (null == time) return "";
			if (isNaN(time)) return "";
			
			var timeFormatted = "";
			timeFormatted += time.getFullYear();
			timeFormatted += "-";
			timeFormatted += $.trim("" + (time.getMonth() + 1)).length < 2 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
			timeFormatted += "-";
			timeFormatted += $.trim("" + time.getDate()).length < 2 ? "0" + time.getDate() : time.getDate();
			timeFormatted += " ";
			timeFormatted += $.trim("" + time.getHours()).length < 2 ? "0" + time.getHours() : time.getHours();
			timeFormatted += ":";
			timeFormatted += $.trim("" + time.getMinutes()).length < 2 ? "0" + time.getMinutes() : time.getMinutes();

			return timeFormatted;
		},
		addSeconds: function(time, seconds) { // 在现有时间上添加秒数
			if (null == time) return null;
			if (isNaN(time)) return null;
			if (null == seconds) return null;
			if (isNaN(seconds)) return null;
			
			var ms = time.getTime(); // 转为时间戳
			var timeAdded = new Date();
			timeAdded.setTime(ms + seconds * 1000);
			
			return timeAdded;
		}
	};

	var gis = __webpack_require__(8)(); // 获取GIS相关支持	
	return $.extend({}, obj, gis); // 扩充后返回
})();



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_main_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_main_css__);
/*
	Library Main Entry
	2017.10.11 GuoJS
*/
// Reference
// import $ from 'expose-loader?$!jquery';	// 导入jQuery


// Global Variables
window.gjs = window.gjs || {};
window.gjs.lib = window.gjs.lib || {};
window.gjs.lib.common = __webpack_require__(1)();
window.gjs.lib.browser = __webpack_require__(9)();
window.gjs.lib.services = __webpack_require__(10)();
window.gjs.lib.gis = window.gjs.lib.gis || {};
window.gjs.lib.gis.baidu = __webpack_require__(11)();



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports
exports.i(__webpack_require__(5), "");

// module
exports.push([module.i, "/*百度地理引擎所需样式*/\r\n\r\nbody, html {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tmargin:0;\r\n\tpadding: 0;\r\n\tfont-family:\"Microsoft Yahei\";\r\n\tfont-size: 13px;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".full-map {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\toverflow: hidden;\r\n\tmargin:0;\r\n\tfont-family:\"\\5FAE\\8F6F\\96C5\\9ED1\";\r\n}\t\t\r\n\r\n.half-map {\r\n\theight:70%;\r\n\twidth:100%;\r\n}\r\n\r\n#result,#result table{\r\n\twidth:100%;\r\n}\r\n\r\n.prompt {\r\n\tz-index: 1000;\r\n\tposition: absolute;\r\n\tleft: 2px;\r\n\ttop: 2px;\r\n\tcolor:red;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	GIS相关常用功能
	GuoJS 2017/10/16
*/
module.exports = function () {
	var exports = gjs.lib.common;
	return exports;
};

var gjs = gjs || {};
gjs.lib = gjs.lib || {};
gjs.lib.common = ( function() {
	var obj = {
		getDistance: function(point1, point2) { // 估算两点之间距离(利用经纬度信息)，米
			var a = Math.abs(point1.lng - point2.lng) * 100000;
			var b = Math.abs(point1.lat - point2.lat) * 100000 * 1.1;
			
			return Math.sqrt(a*a + b*b);
		}
		, getDistancePrompt: function(distance) { // 传入距离米数，返回提示文本
			if (1000 > distance)
				return distance + "米";
			else 
				return Math.round(distance / 100) / 10 + "公里"; // 保留小数点后1位
		}
		, getDurationPrompt: function(duration) { // 传入时间秒，返回提示文本
			if (60 > duration)
				return duration + "秒";
			else if (36000 > duration)
				return Math.round(duration / 60) + "分钟";
			else 
				return Math.round(duration / 3600 * 10) / 10 + "小时"; // 保留小数点后1位
		}
	};
	
	return obj;
})();



/***/ }),
/* 9 */
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
/* 10 */
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
		post: function(url, param, onSuccess, onError, timeout) { // Post request
			var common = window.gjs.lib.common;
			// Check
			if ((!common.isInteger(timeout)) || (0 >= timeout))
				timeout = 1000;
			
			// Request
			var ajaxRequest = $.ajax({ 
				url:url
				, type:"post" //数据发送方式 
				, data:param
				, cache:false
				, timeout: timeout // 请求超时时间设置，单位毫秒
				, dataType:'text' //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
				, error: function(request, status, err){ //失败 
					if (common.isFunction(onError))
						onError(request, status, err);	
				}
				, success: function(message){ //成功 
					// alert(message);
					// eval('('+ message + ')');		
					if (common.isFunction(onSuccess))
						onSuccess(message);						
				}
				, complete: function(XMLHttpRequest, status){ //请求完成后最终执行参数
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



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
	百度GIS定位服务
	GuoJS 2017/10/17
*/
module.exports = function () {
	var exports = gjs.lib.gis.baidu;
	return exports;
};

var common = __webpack_require__(1)();
var parent = __webpack_require__(12)();
var gjs = gjs || {};
gjs.lib = gjs.lib || {};
gjs.lib.gis  = gjs.lib.gis || {};
gjs.lib.gis.baidu = ( function() {
	var obj = {
		map: null
		, mapId: "map"
		, resultId: "result"
		, labelStyle: { // 标注文字说明样式
			height : "20px",
			lineHeight : "20px",
			padding:"0 5px 0 5px",
			color : "gray",
			backgroundColor:"white",
			fontSize : "14px",
			fontFamily:"Microsoft Yahei",
			border:"1px solid gray",
			borderRadius:"3px",
			mozBorderRadius:"3px",
			webkitBorderRadius:"3px",
			webkitBoxShadow:"#666 0px 0px 10px",
			mozBoxShadow:"#666 0px 0px 10px",
			boxShadow:"#666 0px 0px 10px"									
		}
		, planPathStyle : { // 计划线路样式
			strokeColor:"gray" 
			, strokeStyle: "solid" // "dashed"
			, strokeWeight:5 
			, strokeOpacity:0.5
		}
		, message: ""
		, marker: function(thisObj, point, animate, icon) { // 为定位点添加标注
			// Check
			var map = thisObj.map;
			if (!common.isObject(map))
				return null;
			if (!common.isObject(point))
				return null;
			
			// 添加标注
			var marker = null;
			if (!common.isObject(icon))
				marker = new BMap.Marker(point);
			else
				marker = new BMap.Marker(point, {icon: icon}); 
			map.addOverlay(marker);               // 将标注添加到地图中

			if (animate) // 添加动画
				marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

			return marker;
		}
		, label: function(thisObj, point, content, labelOptions, labelStyle) { // 在地图指定地方添加标签说明
			var map = thisObj.map;
			var opts = {
				position : point,    // 指定文本标注所在的地理位置
				offset   : new BMap.Size(30, -30)    //设置文本偏移量
			};
			if (null != labelOptions)
				$.extend(opts, labelOptions);
			var label = new BMap.Label(content, opts);  // 创建文本标注对象
			var style = thisObj.labelStyle;
			if (null != labelStyle)
				$.extend(style, labelStyle)
			label.setStyle(style);
			map.addOverlay(label);   

			return label;
		}
		, ensureLocateViewPort: function(map, points) { // 确保定位的点都能在地图上显示出来
			if (!common.isObject(map)) // 确保map对象有效
				return;
			if (0 >= points.length) // 确保定位点不是空
				return;

			// 设置视野
			map.setViewport(points);
		}
		, getPathPointPrompt: function(distance, duration) { // 显示路径估算距离与时间信息
			return " 【" + common.getDistancePrompt(distance) + "，" + common.getDurationPrompt(duration) +"】"
		}
		, checkAddress: function(address, onFail) { // 检查地理信息是否有效
			$.ajax({
				type:"post",
				url:"http://api.map.baidu.com/geocoder/v2/?callback=renderOption&output=json&address=" + address + "&ak=bxrk9NvT5ORyGv21aVUzSVrcn39DLpz6", 
				dataType:"jsonp", // 跨域访问
				async: false,
				success: function(data) {
					// alert("检查地理位置反馈:" + JSON.stringify(data));
					if (null == data.status) 
						if (common.isFunction(onFail))
							onFail("Fail the resolve address '" + address + "'.");
					if (0 != data.status)
						if (common.isFunction(onFail))
							onFail("Fail the resolve address '" + address + "'.");
				},
				error: function(request, status, err) {
						if (common.isFunction(onFail))
							onFail("Fail the resolve address '" + address + "'.error information:" + err);
				}
			});
		}
		, init: function() { // 初始化地图并显示
			var map;
			
			if (common.isObject(this.map))
				map = this.map;
			else {	
				map = new BMap.Map("map"); // 创建地图对象
				$("#map").removeClass();
				$("#map").addClass("full-map");
				map.enableScrollWheelZoom(true); // 支持缩放
				map.centerAndZoom("北京"); // 显示定位			
									
				this.map = map; // save
			}		
			// 清除所有覆盖物
			map.clearOverlays();
			
			return map;
		}
		, locate: function(positions, onComplete) { // 地图定位功能 
			var map = this.init();

			var thisObj = this; 
			thisObj.message = "";
			thisObj.map = map;
			thisObj.points = [];
			this.doLocate(thisObj, positions, 0, onComplete);
		}
		, doLocate: function(thisObj, positions, index, onComplete) {
			// Check
			if (null == positions) return;
			if (index >= positions.length) { // Locate done!
				if (common.isFunction(onComplete)) { // Call back
					if (common.isEmptyString(thisObj.message))
						onComplete(true);
					else
						onComplete(false, thisObj.message);
				}
				return;
			}
			
			var myGeo = new BMap.Geocoder(); // 创建地址解析器实例
			var address = positions[index];
			var map = thisObj.map;			

			// 获得点位后进行显示标注
			var doMarker = thisObj.marker;
			var doLabel = thisObj.label;
			var doEnsureLocateViewPort = thisObj.ensureLocateViewPort;
			myGeo.getPoint(address, function(point){
				if (point) {
					map.centerAndZoom(point,12); // 显示定位

					// 添加标注
					doMarker(thisObj, point, true);
					// 添加说明标签
					doLabel(thisObj, point, address);

					// 调整视野确保对应的点都能显示在视野中
					thisObj.points[thisObj.points.length] = point;
					doEnsureLocateViewPort(map, thisObj.points);
				}else{
					thisObj.message += "invalid address:" + address + ";";
				}

				// 递归定位
				thisObj.doLocate(thisObj, positions, (index+1), onComplete);
			});
		}
		, pathByAddresses: function(start, end, transitPoints, policy, onFail) { // paint a path by addresses
			// Initialize the map
			var map = this.init();
			
 			// 检查起点是否有效
			this.checkAddress(start, onFail);

			// 检查终点是否有效
			this.checkAddress(end, onFail);

			// 检查途经点是否有效
			for (var i =0; i < transitPoints.length; i++) 
				this.checkAddress(transitPoints[i], onFail);

			// call back
			var searchComplete = function (results) {
				if (BMAP_STATUS_SUCCESS != driving.getStatus()) {
					if (common.isFunction(onFail))
						onFail("Fail to paint the path by address list");
					return;
				}
			};
			var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS]; //三种驾车策略：最少时间，最短距离，避开高速
			if ((!common.isInteger(policy)) || (0 > policy) || (routePolicy.length <= policy)) policy = 0;
			var driving = new BMap.DrivingRoute(
				map
				, {
					renderOptions: {map:map, panel: this.resultId, autoViewport:true}
					, policy: routePolicy[policy]
					, onSearchComplete: searchComplete
				}
			);
			driving.search(start, end, {waypoints:transitPoints});

		}
		, pathByPoints: function(start, end, transitPoints, policy, onComplete) { // 依据指定点的经纬度绘制路径				
			// Initialize the map
			var map = this.init();

			// 准备绘图用的坐标点
			var startt = new BMap.Point(start.lng, start.lat);
			var endd = new BMap.Point(end.lng, end.lat);
			var transitPointss = new Array();
			for (var i = 0; i < transitPoints.length; i ++) {
				transitPointss[i] = new BMap.Point(transitPoints[i].lng, transitPoints[i].lat);
			}

			// 开始绘图
			var thisObj = this; thisObj.map = map;
			var doSavePath = this.savePath;
			var doLabel = this.label;
			var doGetPrompt = this.getPathPointPrompt;
			// var doPathPointLabel = this.pathPointLabel;
			// var flag = false;
			var searchComplete = function (results) {
				if (BMAP_STATUS_SUCCESS == driving.getStatus()) {
					// Save path
					thisObj.result = {path: results, start: start, end: end, transitPoints: transitPoints};
					doSavePath(thisObj.result);
					
					// Show infromation on this plan
					var result = thisObj.result;
					doLabel(thisObj, result.start, result.start.address); // 起点					
					doLabel(
						thisObj
						, result.end
						, result.end.address
							+ doGetPrompt(
								result.end.distance
								, result.end.duration
							)
						); // 终点
					// 必经点
					for (var i = 0; i < transitPointss.length; i ++) {
						doLabel(
							thisObj
							, result.transitPoints[i]
							, result.transitPoints[i].address 
								+ doGetPrompt(
									result.transitPoints[i].distance
									, result.transitPoints[i].duration
								)
							);
					}

					// Call back success
					if (common.isFunction(onComplete))
						onComplete(true, JSON.stringify(result));
				} else {
					if (common.isFunction(onComplete))
						onComplete(false, "Fail to paint the path by point list");
				}	
			} // search complete call back
			var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS]; //三种驾车策略：最少时间，最短距离，避开高速
			if ((!common.isInteger(policy)) || (0 > policy) || (routePolicy.length <= policy)) policy = 0;
			var driving = new BMap.DrivingRoute(
				map
				, {
					renderOptions: {map:map, panel:this.resultId, autoViewport:true}
					, policy: routePolicy[policy]
					, onSearchComplete: searchComplete
				}
			);
			driving.search(startt, endd, {waypoints:transitPointss});
		}
		, savePath: function(result) { // 保存路径
			// 取得线路的地理坐标链，并转换为可保存的结构
			var plan = result.path.getPlan(0); // 获取第一个解决方案
			var path = [];
			var index = 0;
			for (var i = 0; i < plan.getNumRoutes(); i++) {
				var route = plan.getRoute(i); // 获取驾车方案中的一段
				var subPath = route.getPath();
				for (var j = 0; j < subPath.length; j ++ ) {
					path[index] = subPath[j];
					index ++;
				}
			}
					
			// 保存每个点之间的距离
			for (var i = 0; i < path.length; i ++ ) {
				if (0 == i) 
					path[i].distance = 0;
				else
					path[i].distance = common.getDistance(
						{lng: path[i - 1].lng, lat: path[i - 1].lat}
						, {lng: path[i].lng, lat: path[i].lat});
			}						
			
			// 记录估算信息
			result.end.distance = plan.getDistance(false); // 获得估算的距离（米）
			result.end.duration = plan.getDuration(false); // 获取估算的时长（秒）
			var pathPos = 0; // 在路径上寻找与必经点最近的点，方便估算，此处保证路径只遍历一遍，防止最后必经点地理上接近起点的情况
			var subDistance = 0;
			var subDuration = 0;
			for (var i = 0; i < result.transitPoints.length; i ++) {
				// 找必经点在路线中的位置
				for (var j = pathPos; j < path.length ; j ++) {
					subDistance += path[j].distance;

					// 判断采样点与必经点的距离
					var distanceTemp = common.getDistance(
						{lng: result.transitPoints[i].lng, lat: result.transitPoints[i].lat}
						, {lng: path[j].lng, lat: path[j].lat}
					);					
					if  (50 >= distanceTemp) { // 距离够近
						subDuration = result.end.duration / result.end.distance * subDistance;
						result.transitPoints[i].distance = subDistance;
						result.transitPoints[i].duration = subDuration;
						pathPos = j + 1; // 记录当前搜索到的位置
						break;
					} // found
				} // 搜索路径点
			} // 每个必经点
			
			// 保存计划线路
			result.planPath = path;
		}
		, showPath: function(data, onComplete) { // Paint specified path				
			// Initialize the map
			var map = this.init();
			
			// Load data
			var path = null;
			try {
				path = eval('(' + data + ')');
			} catch(ex) {
				if (common.isFunction(onComplete))
					onComplete(false, ex);
				else
					throw ex;
			}
			
			var thisObj = this;
			thisObj.map = map;

 			// 显示起点
			var start = new BMap.Point(path.start.lng,path.start.lat);
			this.marker(thisObj, start, false, 'start point');
			if (!common.isEmptyString(path.start.address))
				this.label(thisObj, start, "起点:" + path.start.address);
			
 			// 显示终点
			var end = new BMap.Point(path.end.lng,path.end.lat);
			this.marker(thisObj, end, false, 'end point');
			if (!common.isEmptyString(path.end.address))
				this.label(thisObj, end, "终点:" + path.end.address);

			// 显示必经点
			if (common.isObject(path.transitPoints)) {
				for (var i = 0; i < path.transitPoints.length; i++ ) {							
					var transitPoint = new BMap.Point(path.transitPoints[i].lng, path.transitPoints[i].lat);
					this.marker(thisObj, transitPoint, false, 'transit point');
					if (!common.isEmptyString(path.transitPoints[i].address))
						this.label(thisObj, transitPoint, "必经点" + (i + 1) + ":" + path.transitPoints[i].address);							
				}
			}
			
			// 显示计划线路
			var points = new Array();
			for (var i = 0; i < path.planPath.length; i++)
				points[i] = new BMap.Point(path.planPath[i].lng, path.planPath[i].lat);
			var line = new BMap.Polyline(points, this.planPathStyle); //创建折线对象
			map.addOverlay(line);
			// line.enableEditing();
			
			// 设置视野
			this.ensureLocateViewPort(map, points);												
		}		
	};
	
	return $.extend({}, parent, obj);
})();



/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	GIS定位服务
	GuoJS 2017/10/17
*/
module.exports = function () {
	var exports = gjs.lib.gis;
	return exports;
};

var gjs = gjs || {};
gjs.lib = gjs.lib || {};
gjs.lib.gis = ( function() {
	var obj = {
		show: function() { } // 初始化地图并显示 
		, locate: function(points) { } // 地图定位功能 
	};
	
	return obj;
})();



/***/ })
/******/ ]);
//# sourceMappingURL=gjs-lib.js.map