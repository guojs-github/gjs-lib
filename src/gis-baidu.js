/*
	百度GIS定位服务
	GuoJS 2017/10/17
*/
module.exports = function () {
	var exports = gjs.lib.gis.baidu;
	return exports;
};

var common = require("./common.js")();
var parent = require('./gis.js')();
var gjs = gjs || {};
gjs.lib = gjs.lib || {};
gjs.lib.gis  = gjs.lib.gis || {};
gjs.lib.gis.baidu = ( function() {
	var obj = {
		mapId: "map"
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
		, message: ""
		, show: function() { // 初始化地图并显示
			var map = new BMap.Map("map"); // 创建地图对象
			$("#map").removeClass();
			$("#map").addClass("full-map");
			map.enableScrollWheelZoom(true); // 支持缩放
			map.centerAndZoom("北京"); // 显示定位			
		}
		, locate: function(positions, onDone) { // 地图定位功能 
			var map = new BMap.Map("map"); // 创建地图对象
			$("#map").removeClass();
			$("#map").addClass("full-map");
			map.enableScrollWheelZoom(true); // 支持缩放

			var thisObj = this; 
			thisObj.message = "";
			thisObj.map = map;
			thisObj.points = [];
			this.doLocate(thisObj, positions, 0, onDone);
		}
		, doLocate: function(thisObj, positions, index, onDone) {
			// Check
			if (null == positions) return;
			if (index >= positions.length) { // Locate done!
				if (common.isFunction(onDone)) { // Call back
					if (common.isEmptyString(thisObj.message))
						onDone(true);
					else
						onDone(false, thisObj.message);
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
				thisObj.doLocate(thisObj, positions, (index+1), onDone);
			});
		}
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
	};
	
	return $.extend({}, parent, obj);
})();

