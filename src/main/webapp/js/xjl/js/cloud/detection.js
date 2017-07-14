//判断是不是模拟器
function isSimulator(){
	return JSON.parse(RCU.Terminal.info()).data.terminal=="terminal-simulator-123";
}
function testTerminalInfo(){
	var json = JSON.parse(RCU.Terminal.info());
	var msg = "";
	if (json.state=="ok"){
		msg = json.data.rcu;
	} else {
		msg = json.error.message + "("+json.error.code+")";
	}
	addItem("终端信息::" + msg,json.state);
}
function testIDCardReader(){
	var json = JSON.parse(RCU.IDCard.reader());
	var msg = "";
	if (json.state=="ok"){
		msg = json.data.name;
	} else {
		msg = json.error.message + "("+json.error.code+")";
	}
	addItem("身份证读卡器::" + msg,json.state);
}
function testSICardReader(){
	var json = JSON.parse(RCU.SICard.reader());
	var msg = "";
	if (json.state=="ok"){
		msg = json.data.no;
	} else {
		msg = json.error.message + "("+json.error.code+")";
	}
	addItem("社保卡::" + msg,json.state);
}
function testThermalPrinters(){
	addItem("小票打印机::<span id='ThermalPrinters'>正在打印</span>","");
	RCU.ThermalPrinters.print({content:"abc",callbackName:"ThermalPrinterCallback"});
}
function ThermalPrinterCallback(code,message){
	setTimeout(function(){
		var errorMessage = "("+message+")&nbsp;&nbsp;";
		if (isSimulator()){
			errorMessage+='<span><a href="#" onclick="RCU.ThermalPrinters.printerReset();">重置打印机</a></span>';
		}
		resetItemStatus("ThermalPrinters",code == "0",errorMessage);
	},2000*(itemNow));
	
}
function testHSICatch(){
	addItem("高拍仪拍照::<span id='HSICatch'>正在拍摄</span>","");
	var ret = RCU.HSI.open('HSICatchCallback');
	var result = JSON.parse(ret);
	if (result.success != true) {
		resetItemStatus("HSICatch",false,result.error.code + '(' + result.error.message + ')');
	}
}
function HSICatchCallback(img){
	setTimeout(function(){
		resetItemStatus("HSICatch",true,"");
	},2000*(itemNow));
}

function testA4PrintersPrintUrl(){
	//打印远端url
	addItem("A4打印网络文件::<span id='A4PrintersPrintUrl'>正在打印网络文件</span>","");
	var url = 'http://homepages.inf.ed.ac.uk/neilb/TestWordDoc.doc';
	var content = {fileUrl:url,callbackName:'testA4PrintersPrintUrlCallback'};
	var cont = JSON.stringify(content);
	RCU.A4Printers.printUrl(cont);
}
function testA4PrintersPrintUrlCallback(code, message){
	setTimeout(function(){
		resetItemStatus("A4PrintersPrintUrl",code == 0,code + "(" + message + ")");
	},2000*(itemNow));
}

function testCertPrintersPrintFile(){
	var json = JSON.parse(RCU.CertPrinters.print());
	var msg = "";
	if (json.state=="ok"){
		//msg = json.data;
	} else {
		msg = json.error.message + "("+json.error.code+")";
	}
	addItem("证照打印本地文件::" + msg,json.state);
}


function testCameraPlay(){
	addItem("摄像头播放::<span id='CameraPlay'>正在打开摄像头</span>","");
	RCU.Camera.play('video', 'testCameraPlayCallback');
}
function testCameraPlayCallback(result) {
	  setTimeout(function(){
		  	var res = JSON.parse(result);
			resetItemStatus("CameraPlay",res.success,"(" + res.error.code + ")");
		},2000*(itemNow));
}
function testCameraSnap(){
	RCU.Camera.snap('video', 'canvas');
	addItem("摄像头拍照::","ok");
}
function testCameraStop(){
	RCU.Camera.stop();
	addItem("摄像头停止::","ok");
}
function testCameraVideo(){
	var json = JSON.parse(RCU.Camera.video());
	var msg = "";
	if (json.state=="ok"){
		//msg = json.data;
	} else {
		msg = json.error.message + "("+json.error.code+")";
	}
	addItem("摄像头录像::" + msg,json.state);
}
function testAudioPlay(){
	var json = JSON.parse(RCU.Audio.play());
	var msg = "";
	if (json.state=="ok"){
		//msg = json.data;
	} else {
		msg = json.error.message + "("+json.error.code+")";
	}
	addItem("喇叭播放声音::" + msg,json.state);
}
function testBarCodeScan(){
	var json = JSON.parse(RCU.BarCode.scan());
	var msg = "";
	if (json.state=="ok"){
		msg = json.data.barcode;
	} else {
		msg = json.error.message + "("+json.error.code+")";
	}
	addItem("扫码::" + msg,json.state);
}


//排队取号机
function detectionPDQHJ(){
	addTitle("A1","排队取号机",4);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	testThermalPrinters();
	testAudioPlay();
}
//电子宣传屏
function detectionDZXCP(){
	addTitle("A2","电子宣传屏",2);
	cleanGroup();
	testTerminalInfo();
	testAudioPlay();
}
//大厅导航机
function detectionDTDHJ(){
	addTitle("A3","大厅导航机",4);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	testThermalPrinters();
	testAudioPlay();
	
}//自助办理终端
function detectionZZBLZD(){
	addTitle("B1","自助办理终端",14-5);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	testHSICatch();
	testThermalPrinters();
	//testA4PrintersPrintContent();
	//testA4PrintersPrintFile();
	testA4PrintersPrintUrl();
	testCameraPlay();
	testCameraSnap();
	testCameraStop();
	//testCameraVideo();
	testAudioPlay();
	//testBarCodeScan();
	//testSICardReader();
}//自助打表终端
function detectionZZDBZD(){
	addTitle("B2","自助打表终端",9-2);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	//testA4PrintersPrintContent();
	//testA4PrintersPrintFile();
	testA4PrintersPrintUrl();
	testCameraPlay();
	testCameraSnap();
	testCameraStop();
	testAudioPlay();
	
}//自助取证终端
function detectionZZQZZD(){
	addTitle("B3","自助取证终端",	10-3);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	//testA4PrintersPrintContent();
	//testA4PrintersPrintFile();
	testA4PrintersPrintUrl();
	testCameraPlay();
	testCameraSnap();
	testCameraStop();
	testAudioPlay();
	//testCertPrintersPrintFile();
}
var itemCode;
var itemTitle;
//总检测数量
var itemCount;
//当前是第几个检测
var itemNow;
//成功的检测数量
var itemSuccess;
function cleanGroup(){
	$("#detectionContentGroup").empty();
}
function addTitle(code,title,count){
	itemCode = code;
	itemTitle = title;
	$("#detectionContentTitle").text("正在检测 " + title);
	itemCount = count;
	itemNow = 0;
	itemSuccess = 0;
	showProgressbar();
}
//添加一个实例item，state为1代表成功，为0代表未知，为-1代表失败
function addItem(item,state){
	setTimeout(function(){
		if (state=="ok"){
			itemSuccess++;
		}
		if (state=="ok"){
			$("#detectionContentGroup").append($('<li class="list-group-item"><span class="badge">OK</span>'+item+'</li>'));
		} else if (state=="error"){
			$("#detectionContentGroup").append($('<li class="list-group-item list-group-item-danger"><span class="badge" style="color:red">&nbsp;&nbsp;X&nbsp;&nbsp;</span>'+item+'</li>'));
		} else {
			$("#detectionContentGroup").append($('<li class="list-group-item list-group-item-warning"><span class="badge" style="color:white">&nbsp;&nbsp;..&nbsp;&nbsp;</span>'+item+'</li>'));
			
		}
		showProgressbar();
	},2000*(++itemNow));

}
function showProgressbar(){
	console.log("显示进度条:",itemNow);
	var value = (itemSuccess/itemCount).toFixed(2)*100;
	$("#progressbar").attr("aria-valuenow",value);
	$("#progressbar").attr("style","width: "+value+"%");
	$("#progressbar").empty();
	$("#progressbar").append($("<span>"+value+"% Complete (success)</span>"));
	if (value == 100){
		$("#deployTerminal").text("发布为" + itemTitle + "类型");
	}
}
function resetItemStatus(id,success,errorMessage){
	var span = $("#"+id);
	if (!success){
		span.empty();
		span.append($("<span>失败"+ errorMessage+"</span>"));
		span.parent().attr("class","list-group-item list-group-item-danger");
		span.parent().find("span").first().attr("style","color:red");
		span.parent().find("span").first().html("&nbsp;&nbsp;X&nbsp;&nbsp;");
	} else {
		span.text("成功");
		span.parent().attr("class","list-group-item");
		span.parent().find("span").first().attr("style","");
		span.parent().find("span").first().html("OK");
		itemSuccess++;
		showProgressbar();
	}
	
}
$(function () {
	//获取当前自动终端类型
	
	var json = JSON.parse(RCU.Terminal.info());
	$.restGet({
        url: 'rest/cdcTerminal/query/guid/'+json.data.terminal,
        success: function (data, status) {
        	console.log("data",data);
        		$("#terminalType").text("当前终端类型:"+data.terminalType$name);
        }
    });
	$('#deployTerminal').on("click", function () {
		if (!$("#deployTerminal").text()){
			console.log("内容为空，不处理点击事件");
			return;
		}
		$.restPut({
	        url: 'rest/cdcTerminal/deploy/'+itemCode + '/'+json.data.terminal,
	        success: function (data, status) {
	        	$("#terminalType").text("当前终端类型:"+itemTitle);
	        	$("#deployTerminal").text("");
	        }
	    });
	});
});