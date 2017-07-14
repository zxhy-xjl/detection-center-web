var RCU = {
		Terminal:{//终端信息
			info:function(){//终端信息,使用字符串拼接方法
				return '{' +
						'"state":"ok",' +
						'"data":{"rcu":"1.0","terminal":"terminal-simulator-123"},' +
						'"error":{}' +
						'}';
			}
		},
		IDCard:{//身份证读卡器
			reader:function(){//读取身份证，使用json对象转换方式
				return JSON.stringify({
					state:"ok", 
					data:{no:'身份证号码',name:'姓名',sex:'性别男女',birthday:'出生日期年月日',validThrough:'有效期年月日',photo:'经过base64编码的照片'},
					error:{}
				});
			}
		},
		ThermalPrinters:{//热敏打印机
			printerCurrentStatus:{code:"0",message:"打印机等待"},//打印机当前状态
			printerStatus:[//打印机状态码
				{code:"0",message:"打印机等待"},
				{code:"1",message:"用户输入数据错误"},
				{code:"2",message:"文件未找到"},
				{code:"3",message:"打印机离线"},
				{code:"4",message:"打印机忙碌"},
				{code:"5",message:"打印机缺纸"},
				{code:"99",message:"其他错误"}
			],
			printerStartPrint:function(callbackName){
				//随机设置一个打印机状态，并在5秒钟之后回复可以使用的状态
				
				setTimeout(function(){
					var keyIndex = parseInt(5*Math.random());
					console.log("keyIndex:" + keyIndex);
					RCU.ThermalPrinters.printerCurrentStatus=RCU.ThermalPrinters.printerStatus[keyIndex];
					if (keyIndex == 0){
						RCU.ThermalPrinters.printerCurrentStatus.message="打印完成";
					}
					console.log("currentStatus:" + RCU.ThermalPrinters.printerCurrentStatus.code+":"+RCU.ThermalPrinters.printerCurrentStatus.message);
					eval(callbackName+"('"+RCU.ThermalPrinters.printerCurrentStatus.code+"','"+RCU.ThermalPrinters.printerCurrentStatus.message+"')");
				},5000);
			},
			printerReset:function(){
				//重置打印机，设置为正常状态
				RCU.ThermalPrinters.printerCurrentStatus=RCU.ThermalPrinters.printerStatus[0];
			},
			print:function(json){//打印小票
				console.log("调用热敏打印机");
				//首先判断打印机是否是就绪状态，如果是就绪状态则打印，否则直接返回错误。
				if (RCU.ThermalPrinters.printerCurrentStatus.code == "0"){
					console.log("当前打印机可用，开始打印");
					RCU.ThermalPrinters.printerStartPrint(json.callbackName);
				} else {
					eval(json.callbackName+"('"+RCU.ThermalPrinters.printerCurrentStatus.code+"','"+RCU.ThermalPrinters.printerCurrentStatus.message+"')");
				}
			}
		},
		A4Printers:{//A4打印机
			printerCurrentStatus:{code:"0",message:"打印机等待"},//打印机当前状态
			printerStatus:[//打印机状态码
				{code:"0",message:"打印机等待"},
				{code:"1",message:"用户输入数据错误"},
				{code:"2",message:"文件未找到"},
				{code:"3",message:"打印机离线"},
				{code:"4",message:"打印机忙碌"},
				{code:"5",message:"打印机缺纸"},
				{code:"99",message:"其他错误"}
			],
			printerStartPrint:function(callbackName){
				//随机设置一个打印机状态，并在5秒钟之后回复可以使用的状态
				
				setTimeout(function(){
					var keyIndex = parseInt(5*Math.random());
					console.log("keyIndex:" + keyIndex);
					RCU.A4Printers.printerCurrentStatus=RCU.A4Printers.printerStatus[keyIndex];
					if (keyIndex == 0){
						RCU.A4Printers.printerCurrentStatus.message="打印完成";
					}
					console.log("currentStatus:" + RCU.A4Printers.printerCurrentStatus.code+":"+RCU.A4Printers.printerCurrentStatus.message);
					eval(callbackName+"('"+RCU.A4Printers.printerCurrentStatus.code+"','"+RCU.A4Printers.printerCurrentStatus.message+"')");
				},5000);
			},
			printerReset:function(){
				//重置打印机，设置为正常状态
				RCU.A4Printers.printerCurrentStatus=RCU.A4Printers.printerStatus[0];
			},
			printContent:function(json){//打印内容，可以为图片或者word内容，经过base64编码
				console.log("A4打印机打印直接打印内容,模拟器未实现");
			},
			printFile:function(json){//打印本地文件，word或者图片等
				console.log("A4打印机打印本地文件,模拟器未实现:");
			},
			
			printUrl:function(json){//打印网上文件，word或者图片等 
				//首先判断打印机是否是就绪状态，如果是就绪状态则打印，否则直接返回错误。
				json = JSON.parse(json);
				if (RCU.A4Printers.printerCurrentStatus.code == "0"){
					console.log("当前打印机可用，开始打印");
					RCU.ThermalPrinters.printerStartPrint(json.callbackName);
				} else {
					//如果当前打印机不可用，则直接调用回调函数，告诉他错误
					eval(json.callbackName+"('"+RCU.A4Printers.printerCurrentStatus.code+"','"+RCU.ThermalPrinters.printerCurrentStatus.message+"')");
				}
			}
		},
		HSI:{//高拍仪
			open:function(callbackName){
				console.log("高拍仪拍照");
				eval(callbackName+"('data:image/jpeg;base64,abc')");
				return JSON.stringify({
					success:true,
					error:{}
				});
			}
		},
		Camera:{//摄像头
			play:function(video,callbackName){
				console.log("摄像头播放");
				var result = JSON.stringify({
					success:true,
					error:{}
				});
				eval(callbackName+"('" + result +"')");
			},
			snap:function(video,canvas){
				console.log("摄像头拍照");
				
			},
			stop:function(){
				console.log("摄像头停止");
				
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
			play:function(){
				console.log("喇叭播放声音");
				return JSON.stringify({
					state:"ok",
					data:{},
					error:{code:"2",message:"文件或者URL资源打不开"}
				});
			}
		},
		BarCode:{//扫码器(枪)
			scan:function(){
				console.log("扫码");
				return JSON.stringify({
					state:"ok",
					data:{barcode:"123456",barcode2:"这是二维码"},
					error:{}
				});
			}
		},
		CertPrinters:{//证照打印
			printFile:function(){//打印本地文件，word或者图片等
				console.log("证照打印本地文件成功");
				return JSON.stringify({
					state:"error",
					data:{},
					error:{code:"3",message:"缺纸"}
				});
			},
		},
		SICard:{//社保卡
			reader:function(){//读取社保卡
				console.log("读取社保卡")
				return JSON.stringify({
					state:"ok", 
					data:{no:"社保卡号码",id:"630101198801011234",
				        mediNo:"6222028888333222",name:"岳云鹏",
				        sex:"男",birthday:"19880101",validThrough:"20361010",
				        amount:"4812.5",photo:"经过base64编码的照片"},
					error:{}
				});
			}
		}
}