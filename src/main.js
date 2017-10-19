/*
	Library Main Entry
	2017.10.11 GuoJS
*/
// Reference
// import $ from 'expose-loader?$!jquery';	// 导入jQuery
import './css/main.css';

// Global Variables
window.gjs = window.gjs || {};
window.gjs.lib = window.gjs.lib || {};
window.gjs.lib.common = require('./common.js')();
window.gjs.lib.browser = require('./browser.js')();
window.gjs.lib.services = require('./services.js')();
window.gjs.lib.gis = window.gjs.lib.gis || {};
window.gjs.lib.gis.baidu = require('./gis/gis-baidu.js')();

