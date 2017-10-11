/*
	Test Entry
	2017.4.25 GuoJS
*/
$(document).ready(function(){
	// alert('ready');
	init();
});

function init() { // initialize
	// alert("init");
	bind(); // Bind events
}

function bind() {
	// alert("bind");
	bindBrowserType();
	bindIsIE();
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
	alert(window.gjs.lib.browser.type());
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
	alert(window.gjs.lib.browser.isIE());
}


