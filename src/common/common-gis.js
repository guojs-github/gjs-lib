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

