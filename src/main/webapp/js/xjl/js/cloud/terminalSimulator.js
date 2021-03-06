if (typeof RCU == "undefined") { 
	//如果不是在RCU客户端上运行，比如在浏览器中直接运行的则使用模拟程序
	var RCU = {
			Terminal:{//终端信息
				info:function(){//终端信息,使用字符串拼接方法
					return JSON.stringify({
						state:"ok",
						data:{rcu:"1.0",terminal:"terminal-simulator-123"},
						error:{}
					});
				}
			},
			IDCard:{//身份证读卡器
				reader:function(jsonString){//读取身份证，使用json对象转换方式
					var json = JSON.parse(jsonString);
					console.log("IdCard reader json",json);
					RCU.Audio.playText(JSON.stringify({text:"请刷身份证"}));
					setTimeout(function(){
						var data =  JSON.stringify({
							state:"ok", 
							data:{no:'32010620101111288X',name:'张三',sex:'男',birthday:'2010.8.1',validThrough:'2026.8.1',photo:'经过base64编码的照片'},
							error:{}
						});
						var callback = json.callbackName+"('"+data+"')";
						console.log("callback:",callback);
						eval(callback);
					},json.timeoutSeconds*1000);
				}
			},
			ThermoPrinter:{//热敏打印机
				printerCurrentStatus:{code:"00",message:"打印机等待"},//打印机当前状态
				printerStatus:[//打印机状态码
					{code:'00',message:'打印机等待（打印成功）'},
					{code:'01',message:'用户输入数据错误'},
					{code:'02',message:'文件未找到'},
					{code:'03',message:'打印机离线'},
					{code:'04',message:'打印机忙碌'},
					{code:'05',message:'打印机缺纸'},
					{code:'99',message:'其它错误'}
				],
				printerStartPrint:function(json){
					//随机设置一个打印机状态，并在5秒钟之后回复可以使用的状态
					setTimeout(function(){
						var keyIndex = parseInt(5*Math.random());
						console.log("keyIndex:" + keyIndex);
						RCU.ThermoPrinter.printerCurrentStatus=RCU.ThermoPrinter.printerStatus[keyIndex];
						if (RCU.ThermoPrinter.printerCurrentStatus.code == "00"){
							RCU.ThermoPrinter.printerCurrentStatus.message="打印完成";
						}
						console.log("currentStatus:" + RCU.ThermoPrinter.printerCurrentStatus.code+":"+RCU.ThermoPrinter.printerCurrentStatus.message);
						eval(json.callbackName+"('"+RCU.ThermoPrinter.printerCurrentStatus.code+"','"+RCU.ThermoPrinter.printerCurrentStatus.message+"')");
					},5000);
				},
				printerReset:function(){
					//重置打印机，设置为正常状态
					RCU.ThermoPrinter.printerCurrentStatus=RCU.ThermoPrinter.printerStatus[0];
				},
				print:function(jsonString){//打印小票
					console.log("调用热敏打印机");
					var json = JSON.parse(jsonString);
					console.log("参数:",json);
					//首先判断打印机是否是就绪状态，如果是就绪状态则打印，否则直接返回错误。
					if (RCU.ThermoPrinter.printerCurrentStatus.code == "00"){
						console.log("当前打印机可用，开始打印");
						RCU.ThermoPrinter.printerStartPrint(json);
					} else {
						console.log("当前打印机不可用，直接调用回调函数");
						eval(json.callbackName+"('"+RCU.ThermoPrinter.printerCurrentStatus.code+"','"+RCU.ThermoPrinter.printerCurrentStatus.message+"')");
					}
				}
			},
			A4Printer:{//A4打印机
				printerCurrentStatus:{code:"00",message:"打印机等待"},//打印机当前状态
				printerStatus:[//打印机状态码
					{code:'00',message:'打印机等待（打印成功）'},
					{code:'01',message:'用户输入数据错误'},
					{code:'02',message:'文件未找到'},
					{code:'03',message:'打印机离线'},
					{code:'04',message:'打印机忙碌'},
					{code:'05',message:'打印机缺纸'},
					{code:'99',message:'其它错误'}
				],
				printerStartPrint:function(json){
					//随机设置一个打印机状态，并在5秒钟之后回复可以使用的状态
					console.log("printerStartPrint json",json);
					setTimeout(function(){
						var keyIndex = parseInt(5*Math.random());
						console.log("keyIndex:" + keyIndex);
						RCU.A4Printer.printerCurrentStatus=RCU.A4Printer.printerStatus[keyIndex];
						console.log("currentStatus:" + RCU.A4Printer.printerCurrentStatus.code+":"+RCU.A4Printer.printerCurrentStatus.message);
						if (RCU.A4Printer.printerCurrentStatus.code=="00"){
							RCU.A4Printer.printerCurrentStatus.message = "打印完成";
						}
						console.log("callbackName:",json.callbackName);
						var callback = json.callbackName+"('"+RCU.A4Printer.printerCurrentStatus.code+"','"+RCU.A4Printer.printerCurrentStatus.message+"')";
						console.log("callback:",callback);
						eval(callback);
					},5000);
				},
				printerReset:function(){
					//重置打印机，设置为正常状态
					RCU.A4Printer.printerCurrentStatus=RCU.A4Printer.printerStatus[0];
				},
				printContent:function(json){//打印内容，可以为图片或者word内容，经过base64编码
					console.log("A4打印机打印直接打印内容,模拟器未实现");
				},
				printFile:function(json){//打印本地文件，word或者图片等
					console.log("A4打印机打印本地文件,模拟器未实现:");
				},
				
				printUrl:function(jsonString){//打印网上文件，word或者图片等 
					//首先判断打印机是否是就绪状态，如果是就绪状态则打印，否则直接返回错误。
					var json = JSON.parse(jsonString);
					console.log("printUrl",json);
					if (RCU.A4Printer.printerCurrentStatus.code == "00"){
						console.log("当前打印机可用，开始打印");
						RCU.A4Printer.printerStartPrint(json);
					} else {
						console.log("如果当前打印机不可用，则直接调用回调函数，告诉他错误");
						eval(json.callbackName+"('"+RCU.A4Printer.printerCurrentStatus.code+"','"+RCU.ThermoPrinter.printerCurrentStatus.message+"')");
					}
				}
			},
			HSI:{//高拍仪
				open:function(jsonString){
					console.log("高拍仪拍照");
					var json = JSON.parse(jsonString);
					var callbackName = json.callbackName;
					var content = {state:'ok',data:{img:'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'},
							error:{code:'01',message:'设备打开失败'}
					}
					setTimeout(function(){
						eval(callbackName+"('"+JSON.stringify(content)+"')");
					},2000);
				}
			},
			Camera:{//摄像头
				open:function(jsonString){
					console.log("摄像头打开");
					var json = JSON.parse(jsonString);
					var callbackName = json.callbackName;
					var content = {state:'ok',data:{img:'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'},
							error:{code:'01',message:'设备打开失败'}
					}
					setTimeout(function(){
						eval(callbackName+"('"+JSON.stringify(content)+"')");
					},2000);
				},
				
				video:function(){
					console.log("摄像头录像");
					return JSON.stringify({
						state:"error",
						data:{media:"http://127.0.0.1:8080/mediaUpload/630101198801011234.avi"},
						error:{code:"1",message:"没有找到设备"}
					});
				}
			},
			Audio:{//喇叭
				play:function(jsonString){//播放声音文件
					var json = JSON.parse(jsonString);
					console.log("喇叭播放声音地址:"+json.url);
					new Audio(json.url).play();
					setTimeout(function(){
						if (json.callbackName){
							eval(json.callbackName+"('00','成功')");
						}
					},2000);
					
				},
				playText:function(jsonString){//根据文字合成声音进行播放
					var json = JSON.parse(jsonString);
					console.log("喇叭播放声音内容:"+json.text);
					var text = json.text;
					var terminal = JSON.parse(RCU.Terminal.info()).data.terminal;
					
					var soundURL="http://tsn.baidu.com/text2audio?tex="+text+"&lan=zh&cuid="+terminal+"&ctp=1&tok=24.ccdf18f27e8fc0b0845fb0ea3ee22e27.2592000.1520171527.282335-9968802";
					this.play(JSON.stringify({url:soundURL,callbackName:json.callbackName}));
				}
			},
			BarCode:{//扫码器(枪)
				scan:function(jsonString){
					var json = JSON.parse(jsonString);
					console.log("barcode scan",json);
					if (json.callbackName){
						var content = {state:"ok",data:{code:"123456"},error:{}};
						console.log("barcode content"+JSON.stringify(content));
						setTimeout(function(){
							eval(json.callbackName+"('"+JSON.stringify(content)+"')");
						},2000);
					}
				}
			},
			CertPrinters:{//证照打印
				printFile:function(){//打印本地文件，word或者图片等
					console.log("CertPrinters该方法暂不支持");
				},
			},
			SICard:{//社保卡
				reader:function(){//读取社保卡
					console.log("SICard该方法暂不支持");
				}
			}
	}
}
