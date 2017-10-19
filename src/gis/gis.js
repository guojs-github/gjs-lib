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

