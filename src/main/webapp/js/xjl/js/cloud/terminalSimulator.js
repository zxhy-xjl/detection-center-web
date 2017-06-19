var XJL = {
		Terminal:{//终端信息
			info:function(){//终端信息
				return "{rcu:'1.0',terminal:'机器唯一编码'}";
			}
		},
		IDCard:{//身份证读卡器
			reader:function(){//读取身份证
				return "{no:'身份证号码',name:'姓名',sex:'性别男女',birthday:'出生日期年月日',validThrough:'有效期年月日',photo:'经过base64编码的照片'}";
			}
		},
		ThermalPrinters:{//热敏打印机
			print:function(pic){//打印小票
				console.log("热敏打印成功")
			}
		},
		A4Printers:{//A4打印机
			printFile:function(){//打印本地文件，word或者图片等
				console.log("A4打印机打印本地文件成功")
			},
			printURLFile:function(){//打印网上文件，word或者图片等 
				console.log("A4打印机打印网上文件成功")
			},
			printString:function(){// 打印一段字符串
				console.log("A4打印机打印一段字符串成功")
			},
			printHTMLPage:function(){//打印某个HTML5网页效果，非源码。
				console.log("A4打印机打印某个HTML5网页效果成功")
			}
		}
}