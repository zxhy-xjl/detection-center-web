var RCU = {
		Terminal:{//终端信息
			info:function(){//终端信息,使用字符串拼接方法
				return '{' +
						'"state":"ok",' +
						'"data":{"rcu":"1.0","terminal":"'+XJL.getUrlParam("clientID")+'"},' +
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
			print:function(pic){//打印小票
				console.log("热敏打印成功");
				return JSON.stringify({
					state:"ok",
					data:{},
					error:{}
				});
			}
		},
		A4Printers:{//A4打印机
			printContent:function(json){//打印内容，可以为图片或者word内容，经过base64编码
				console.log("A4打印机打印内容成功");
				return JSON.stringify({
					state:"ok",
					data:{},
					error:{}
				});
			},
			printFile:function(json){//打印本地文件，word或者图片等
				console.log("A4打印机打印本地文件成功:");
				return JSON.stringify({
					state:"ok",
					data:{},
					error:{}
				});
			},
			printUrl:function(json){//打印网上文件，word或者图片等 
				console.log("A4打印机打印网上文件成功");
				return JSON.stringify({
					state:"ok",
					data:{},
					error:{}
				});
			}
		},
		HSI:{//高拍仪
			catch:function(){
				console.log("高拍仪拍照");
				return JSON.stringify({
					state:"ok",
					data:{photos:["abc","bcd"]},
					error:{}
				});
			}
		},
		Camera:{//摄像头
			play:function(){
				console.log("摄像头播放");
				return JSON.stringify({
					state:"ok",
					data:{photo:"照片"},
					error:{}
				});
			},
			snap:function(){
				console.log("摄像头拍照");
				return JSON.stringify({
					state:"ok",
					data:{photo:"照片"},
					error:{}
				});
			},
			stop:function(){
				console.log("摄像头停止");
				return JSON.stringify({
					state:"ok",
					data:{photo:"照片"},
					error:{}
				});
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