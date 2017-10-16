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
	};
	
	return obj;
})();

