/*
	Test Entry
	2017.4.25 GuoJS
*/
var lib = window.gjs.lib;
$(document).ready(function(){
	// alert('ready');
	init();
});

function init() { // initialize
	// alert("init");
	bind(); // Bind events
	lib.gis.baidu.init(); // Show map
}

function bind() {
	// alert("bind");
	bindBrowserType();
	bindIsIE();
	bindAvailHeight();
	bindServicesGet();
	bindFormatTime();
	bindAddSeconds();
	
	bindGisLocate();
	bindGisPathByAddress();
}

function bindBrowserType() { // Bind browser type event
	var el = null;
	try {
		el = $("#browser-type");
		if (0 < el.length)
			el.click(onBrowserType);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onBrowserType() { // Browser type event
	// alert("onBrowserType");
	alert(lib.browser.type());
}

function bindIsIE() { // Bind is ie event
	var el = null;
	try {
		el = $("#is-ie");
		if (0 < el.length)
			el.click(onIsIE);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onIsIE() {
	// alert("onIsIE");
	alert(lib.browser.isIE());
}

function bindAvailHeight() { // Bind get available height event
	var el = null;
	try {
		el = $("#avail-height");
		if (0 < el.length)
			el.click(onAvailHeight);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onAvailHeight() {
	// alert("onAvailHeight");
	alert(lib.browser.availHeight());
}

function bindServicesGet() { // Bind ajax services get demo event
	var el = null;
	try {
		el = $("#services-get");
		if (0 < el.length)
			el.click(onServicesGet);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onServicesGet() {
	// alert("onServicesGet");
	gjs.lib.services.get("http://api.map.baidu.com/geocoder/v2/?callback=JSONP_CALLBACK&output=json&address=故宫&ak=bxrk9NvT5ORyGv21aVUzSVrcn39DLpz6"
		,onServicesGetSuccess
		,onServicesGetError);
}

function onServicesGetSuccess(message) {
	var data = JSON.stringify(message);
	alert(data);
}

function onServicesGetError(request, status, err) {
	alert("Ajax post演示通讯错误");
}

function bindFormatTime() { // Bind format time event
	var el = null;
	try {
		el = $("#format-time");
		if (0 < el.length)
			el.click(onFormatTime);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onFormatTime() { // Format time event
	// alert("onFormatTime");
	var now = new Date();
	alert(lib.common.formatTime(now));
}

function bindAddSeconds() { // Bind add seconds event
	var el = null;
	try {
		el = $("#add-seconds");
		if (0 < el.length)
			el.click(onAddSeconds);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onAddSeconds() { // Add seconds event
	// alert("onAddSeconds");
	var common = lib.common;
	var now = new Date();
	alert(common.formatTime(common.addSeconds(now, 90)));
}

function bindGisLocate() { // Bind locate position on map event
	var el = null;
	try {
		el = $("#gis-locate");
		if (0 < el.length)
			el.click(onGisLocate);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onGisLocate() { // Locate position on map event
	// alert("onGisLocate");
	lib.gis.baidu.locate(["江苏省苏州市苏州工业园红枫路35号","江苏省苏州市吴中区亭和路86号", "江苏省苏州工业园区同胜路90号"], onGisLocateDone);
	// lib.gis.baidu.locate(["江苏省苏州市苏州工业园红枫路35号","江苏省苏州市吴中区亭和路86号", "江苏省苏州工业园区同胜路90号","121klfadskl"], onGisLocateDone);
}

function onGisLocateDone(success, message) { // Locate position call back
	// alert('onGisLocateDone');
	var el = $("#gis-message");
	
	if (0 < el.length) {
		if (success)
			el.html("定位成功");
		else 
			el.html("发生错误：" + message);
	}
}

function bindGisPathByAddress() { // Bind paint path by address list on map event
	var el = null;
	try {
		el = $("#gis-path-by-address");
		if (0 < el.length)
			el.click(onGisPathByAddress);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onGisPathByAddress() { // Locate position on map event
	//alert("onGisPathByAddress");
	var el = $("#gis-message");
	if (0 < el.length) 
		el.html("");
	lib.gis.baidu.pathByAddress("天安门","百度大厦", ["北京科技大学","北京国际会议中心"], 0, onGisPathByAddressFail);
	// lib.gis.baidu.pathByAddress("xxxxxxxx","百度大厦", ["北京科技大学","北京国际会议中心"], 0, onGisPathByAddressFail);
}

function onGisPathByAddressFail(message) { // Paint path by address list on map fail event
	// alert('onGisPathByAddressFail');
	var el = $("#gis-message");
	
	if (0 < el.length) {
			el.html(el.html() + message);
	}
}
