/*
	提供系统级别的服务
	GuoJS 2017/10/15
*/
module.exports = function () {
	var exports = gjs.lib.services;
	return exports;
};

var gjs = gjs || {};
gjs.lib = gjs.lib || {};
gjs.lib.services = ( function() {
	var obj = {
		post: function(url, onSuccess, onError, timeout) { // Post request
			var common = window.gjs.lib.common;
			// Check
			if ((!common.isInteger(timeout)) || (0 >= timeout))
				timeout = 1000;
			
			// Request
			var ajaxRequest = $.ajax({ 
				url:url, 
				type:"post", //数据发送方式 
				cache:false,
				timeout: timeout, // 请求超时时间设置，单位毫秒
				dataType:'text', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
				error: function(request, status, err){ //失败 
					if (common.isFunction(onError))
						onError(request, status, err);	
				}, 
				success: function(message){ //成功 
					// alert(message);
					// eval('('+ message + ')');		
					if (common.isFunction(onSuccess))
						onSuccess(message);						
				}, 
				complete: function(XMLHttpRequest, status){ //请求完成后最终执行参数
			　　　　if('timeout' == status){ //超时,status还有success,error等值的情况
						ajaxRequest.abort();
					}
				}
			});  // ajax
		},
		get: function(url, onSuccess, onError, timeout) { // Post request
			var common = window.gjs.lib.common;
			// Check
			if ((!common.isInteger(timeout)) || (0 >= timeout))
				timeout = 1000;
			
			// Request
			var ajaxRequest = $.ajax({ 
				url:url, 
				type:"get", //数据发送方式 
				cache:false,
				timeout: timeout, // 请求超时时间设置，单位毫秒
				dataType:'jsonp', //接受数据格式 (这里有很多,常用的有html,xml,js,json) jsonp是支持跨域调用
				error: function(request, status, err){ //失败 
					if (common.isFunction(onError))
						onError(request, status, err);	
				}, 
				success: function(message){ //成功 
					// alert(message);
					// eval('('+ message + ')');		
					if (common.isFunction(onSuccess))
						onSuccess(message);						
				}, 
				complete: function(XMLHttpRequest, status){ //请求完成后最终执行参数
			　　　　if('timeout' == status){ //超时,status还有success,error等值的情况
						ajaxRequest.abort();
					}
				}
			});  // ajax
		}
	};
	
	return obj;
})();

