/*
	百度GIS定位服务
	GuoJS 2017/10/17
*/
module.exports = function () {
	var exports = gjs.lib.gis.baidu;
	return exports;
};

var common = require("../common.js")();
var parent = require('./gis.js')();
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
		, pathByPoints: function(start, end, transitPoints, policy, onFail) { // 依据指定点的经纬度绘制路径				
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
			// var doGetPrompt = this.getPathPointPrompt;
			// var doPathPointLabel = this.pathPointLabel;
			// var flag = false;
			var searchComplete = function (results) {
				if (BMAP_STATUS_SUCCESS == driving.getStatus()) {
					/*
					// 只做一次
					if (flag) return;
					flag = true;

					// 保存记录
					interface.savePath(results, debug); // 保存驾车线路						
					
					// 添加关键点信息标注
					doPathPointLabel({
						results: results,
						map: map,
						doLabel: doLabel,
						doGetPrompt: doGetPrompt,
						start: start,
						end: end,
						transitPoints: transitPoints
					});
					*/
					thisObj.result = {path: results, start: start, end: end, transitPoints: transitPoints};
					doSavePath(thisObj.result);
					doLabel(thisObj, startt, start.address); // 起点					
					doLabel(thisObj, endd, end.address); // 终点
					// 必经点
					for (var i = 0; i < transitPointss.length; i ++) {
						doLabel(thisObj, transitPointss[i], transitPoints[i].address);
					}		
/* 			doLabel(
				map
				, end
				, options.end.address + doGetPrompt(options.end.distance, options.end.duration)
			); // 终点带估算
 			for (var i = 0; i < options.transitPoints.length; i ++) {
				doLabel(
					map
					, transitPoints[i]
					, options.transitPoints[i].address + doGetPrompt(options.transitPoints[i].distance, options.transitPoints[i].duration)
				);
			} // 显示必经点			
			*/
					
				} else {
					if (common.isFunction(onFail))
						onFail("Fail to paint the path by point list");
					return;					
				}	
			}
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
			
			/*
			// 记录估算信息
			var distance = plan.getDistance(false); // 获得估算的距离（米）
			var duration = plan.getDuration(false); // 获取估算的时长（秒）
			options.end.distance = distance;
			options.end.duration = duration;
			var pathPos = 0; // 在路径上寻找与必经点最近的点，方便估算，此处保证路径只遍历一遍，防止最后必经点地理上接近起点的情况
			var subDistance = 0;
			for (var i = 0; i < options.transitPoints.length; i ++) {
				// 找必经点在路线中的位置
				for (var j = pathPos; j < path.length ; j ++) {
					subDistance += path[j].distance;

					// 判断采样点与必经点的距离
					var distanceTemp = common.getDistance(
						{lng: options.transitPoints[i].lng, lat: options.transitPoints[i].lat}
						, {lng: path[j].lng, lat: path[j].lat}
					);					
					if  ( 50 >= distanceTemp) { // 距离够近
						var subDuration = duration / distance * subDistance;
						options.transitPoints[i].distance = subDistance;
						options.transitPoints[i].duration = subDuration;
						pathPos = j + 1; // 记录当前搜索到的位置
						break;
					} // found
				} // 搜索路径点
			} // 每个必经点			
			*/
/*			
			// 组织路径信息
			var pathInfo = {
				start: options.start, // 起点
				end: options.end, // 终点
				transitPoints: options.transitPoints, // 途经点
				path: path // 路径
			};
			var pathInfoString = JSON.stringify(pathInfo);

			if (common.isInvalidId(options.id)) // 没有id不保存
				return;
				
			// 调用后端接口进行保存
			$.ajax({
				url:'./server/savePath.jsp',
				type:'post',
				data:{'id':options.id,'path':pathInfoString},
				dataType: 'text',
				error: function() { 
					alert('无法正确调用保存路径过程'); 
				},
				success: function(data) {
					if ("true" != $.trim(data))
						alert('无法正确保存路径:' + data); 
				}
			});		
		*/
		}		
	};
	
	return $.extend({}, parent, obj);
})();

