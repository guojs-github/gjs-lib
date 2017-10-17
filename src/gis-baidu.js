/*
	百度GIS定位服务
	GuoJS 2017/10/17
*/
module.exports = function () {
	var exports = gjs.lib.gis.baidu;
	return exports;
};

var parent = require('./gis.js')();
var gjs = gjs || {};
gjs.lib = gjs.lib || {};
gjs.lib.gis  = gjs.lib.gis || {};
gjs.lib.gis.baidu = ( function() {
	var obj = {
		mapId: "map"
		, messageId: "message"
		, show: function() { // 初始化地图并显示
			var map = new BMap.Map("map"); // 创建地图对象
			$("#map").removeClass();
			$("#map").addClass("full-map");
			map.enableScrollWheelZoom(true); // 支持缩放
			map.centerAndZoom("北京"); // 显示定位			
		}
		, locate: function(points) { // 地图定位功能 
		}
	};
	
	return $.extend({}, parent, obj);
})();

