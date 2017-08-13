var XJL = {
		getUrlParam:function (name){
			console.log("getUrlParam方法开始调用:"+name);
			if (!this.urlParams){
				console.log("urlParams为空，开始构建");
				this.urlParams=new Object();   
				var query=location.search.substring(1);//获取查询串   
				var pairs=query.split("&");//在逗号处断开   
				for(var   i=0;i<pairs.length;i++) {   
						var pos=pairs[i].indexOf('=');//查找name=value   
						if(pos==-1)   continue;//如果没有找到就跳过   
						var argname=pairs[i].substring(0,pos);//提取name   
						var value=pairs[i].substring(pos+1);//提取value   
						this.urlParams[argname]=decodeURI(value);//存为属性
						console.log("参数" +(i+1),argname +"="+ decodeURI(value));
				}
			}
			console.log("返回",name + "的值" + this.urlParams[name]);
			return this.urlParams[name];
		},
		getProjectURL:function(){
			//获取当前网址，如： http://localhost:8080/Tmall/index.jsp 
			var curWwwPath=window.document.location.href; 
			//获取主机地址之后的目录如：/Tmall/index.jsp 
			var pathName=window.document.location.pathname; 
			//获取主机地址，如： http://localhost:8080 
			var pos=curWwwPath.indexOf(pathName); 
			var localhostPath=curWwwPath.substring(0,pos); 
			//获取带"/"的项目名，如：/Tmall 
			var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1); 
			return localhostPath+projectName;
		},
		bindCloseWindowEvent:function(){
			console.log("executeBindCloseWindow",this.executeBindCloseWindow);
			console.log("绑定关闭窗口事件");
			console.log("父窗口",window.opener);
			console.log("parentEvent", this.getUrlParam("parentEvent"));
			if (window.opener && XJL.getUrlParam("parentEvent")){
				console.log("父窗口不为空，并且父窗口事件也不为空")
				$(window).bind('beforeunload',function(){
					if (this.executeBindCloseWindow){
						var parentEvent = XJL.getUrlParam("parentEvent");
						eval("window.opener."+parentEvent+"()");
					}
				});
			}
		},
		executeBindCloseWindow : true,
		point:{
			info:function(text){
				$("#loadInfoPanel").addClass("bg-info");
				$("#loadInfoPanel").removeClass("bg-danger");
				$("#loadInfoPanel").text("提示："+text);
			},
			error:function(text){
				$("#loadInfoPanel").addClass("bg-danger");
				$("#loadInfoPanel").removeClass("bg-info");
				$("#loadInfoPanel").text("错误："+text);
			}
		},
		initTerminalInfo:function(restPath){
			if (!restPath){
				restPath = "";
			}
			var terminalData = JSON.parse(RCU.Terminal.info()).data;
			var terminalID = XJL.getUrlParam("clientID");
			if (terminalID){
				terminalData.terminal=terminalID;
			}
			$("#rcuNo").text("RCU:"+terminalData.rcu);
			$("#terminalNo").text("编号:"+terminalData.terminal);
			$.restGet({
		        url: restPath+'rest/cdcTerminal/query/guid/'+terminalData.terminal,
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
		loadSimulator:function(callbackName,jsPath){
			if (!jsPath){
				jsPath="";
			}
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
				$.getScript(jsPath+"js/xjl/js/cloud/terminalSimulator.js").done(function(){
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
		},
		encodeURI:function(uri){//二次加密url路径，后端使用uriDecoder即可
			return encodeURIComponent(encodeURIComponent(uri));
		}
}
XJL.bindCloseWindowEvent();