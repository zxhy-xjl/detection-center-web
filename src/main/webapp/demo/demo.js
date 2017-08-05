var Demo={
	initTerminalInfo:function(){
		var terminalData = JSON.parse(RCU.Terminal.info()).data;
		$("#rcuNo").text("RCU:"+terminalData.rcu);
		$("#terminalNo").text("编号:"+terminalData.terminal);
		$.restGet({
	        url: '../rest/cdcTerminal/query/guid/'+terminalData.terminal,
	        success: function (data, status) {
	        	$("#terminalType").text("类型:"+data.terminalType$name);
	        },
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	        	console.log("发生错误XMLHttpRequest",XMLHttpRequest);
	        	console.log("发生错误textStatus",textStatus);
	        	console.log("发生错误errorThrown",errorThrown);
	        	$("#terminalType").text("类型:错误"+XMLHttpRequest.status);
	        }
	    });
	},
	loadSimulator:function(simulatorUrl,callbackName){
		if (typeof Worker == "undefined") {   
			$("#container").empty();
			$("#container").text("不支持HTML5，请在符合RCU标准规范的平台上运行");
			return true;
		}  
		//获取当前自动终端类型
		if (typeof RCU == "undefined"){
			console.log("RCU未定义");
			XJL.point.info("开始加载RCU模拟器");
			console.log("开始加载模拟器");
			$.getScript(simulatorUrl).done(function(){
				XJL.point.info("正在RCU模拟器上运行");
				eval(callbackName+"()");
			}).fail(function(){
				XJL.point.error("加载RCU模拟器失败");
				$("#container").empty();
			    $("#container").text("不支持RCU，系统将自动加载模拟器失败，请在符合RCU标准的平台上运行");
			});
		} else {
			eval(callbackName+"()");
		}
	}
}