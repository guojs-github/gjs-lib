/* 
	通用功能汇总
	2017.4.25 GuoJS
*/
module.exports = function () {
	var exports = global.common;
	return exports;
};

var global = global || {};
global.common = (function () {
	var obj = {
		getQueryStringByName: function(name) { // 分析字符串获取指定参数值
			var reg = new RegExp('[\?\&]' + name + '=([^\&]+)', 'i');
			var result = window.location.search.match(reg);
			if ( null == result || 1 > result.length) {
				return "";
			}
			return result[1];
		},
		getDistancePrompt: function(distance) { // 传入距离米数，返回提示文本
			if (1000 > distance)
				return distance + "米";
			else 
				return Math.round(distance / 100) / 10 + "公里"; // 保留小数点后1位
		},
		getDurationPrompt: function(duration) { // 传入时间秒，返回提示文本
			if (60 > duration)
				return duration + "秒";
			else if (36000 > duration)
				return Math.round(duration / 60) + "分钟";
			else 
				return Math.round(duration / 3600 * 10) / 10 + "小时"; // 保留小数点后1位
		},
		getTimePrompt: function(time) { // 格式化时钟显示
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
		getDistance: function(point1, point2) { // 估算两点之间距离，米
			var a = Math.abs(point1.lng - point2.lng) * 100000;
			var b = Math.abs(point1.lat - point2.lat) * 100000 * 1.1;
			
			return Math.sqrt(a*a + b*b);
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
	return obj;
})();
