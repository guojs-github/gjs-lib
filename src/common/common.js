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

	var gis = require('./common-gis.js')(); // 获取GIS相关支持	
	return $.extend({}, obj, gis); // 扩充后返回
})();

