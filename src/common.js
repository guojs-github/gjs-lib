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

