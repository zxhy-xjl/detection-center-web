//判断是不是模拟器
function isSimulator(){
	return JSON.parse(RCU.Terminal.info()).data.terminal=="terminal-simulator-123";
}
//RCU终端
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
//身份证读卡器

function testIDCardReader(){
	testIdCardReaderCallback(RCU.IDCard.reader());
	
}
function testIdCardReaderCallback(jsonString){
		console.log("jsonString",jsonString);
		var json = JSON.parse(jsonString);
		var msg = "";
		if (json.state=="ok"){
			msg = "姓名:" + json.data.name;
		} else {
			msg = json.error.message + "("+json.error.code+")";
		}
		addItem("身份证读卡器::"+msg,json.state);
}


function testThermoPrinter(){
	addItem("小票打印机::<span id='ThermoPrinter'>正在打印</span>","waiting");
	RCU.ThermoPrinter.print(JSON.stringify({content:"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",callbackName:"ThermoPrinterCallback"}));
}
function ThermoPrinterCallback(code,message){
	setTimeout(function(){
		var errorMessage = "("+message+")&nbsp;&nbsp;";
		if (isSimulator()){
			errorMessage+='<span><a href="#" onclick="RCU.ThermoPrinter.printerReset();">重置打印机</a></span>';
		}
		resetItemStatus("ThermoPrinter",code == "00",errorMessage);
	},2000*(itemNow));
	
}
function testHSICatch(){
	addItem("高拍仪拍照::<span id='HSICatch'>正在拍摄</span>","waiting");
	RCU.HSI.open(JSON.stringify({callbackName:'HSICatchCallback'}));
}
function HSICatchCallback(jsonString){
	console.log("HSICatchCallback:"+ jsonString);
	var json = JSON.parse(jsonString);
	console.log("HSICatchCallback:",json);
	setTimeout(function(){
		var success = json.state=="ok";
		var message = json.error.code + ":" + json.error.message
		resetItemStatus("HSICatch",success,message);
	},2000*(itemNow));
}

function testA4PrinterPrintUrl(){
	//打印远端url
	addItem("A4打印网络文件::<span id='A4PrinterPrintUrl'>正在打印网络文件</span>","waiting");
	var url = 'http://homepages.inf.ed.ac.uk/neilb/TestWordDoc.doc';
	var content = {fileUrl:url,callbackName:'testA4PrinterPrintUrlCallback'};
	var cont = JSON.stringify(content);
	RCU.A4Printer.printUrl(cont);
}
function testA4PrinterPrintUrlCallback(code, message){
	setTimeout(function(){
		resetItemStatus("A4PrinterPrintUrl",code == "00",code + "(" + message + ")");
	},2000*(itemNow));
}

function testCameraOpen(){
	addItem("摄像头拍照::<span id='CameraOpen'>正在打开摄像头</span>","waiting");
	RCU.Camera.open(JSON.stringify({callbackName:'testCameraOpenCallback'}));
}
function testCameraOpenCallback(jsonString) {
	console.log("testCameraOpenCallback:"+ jsonString);
	var json = JSON.parse(jsonString);
	console.log("testCameraOpenCallback:",json);
	setTimeout(function(){
		var success = json.state=="ok";
		var message = json.error.code + ":" + json.error.message
		resetItemStatus("CameraOpen",success,message);
	},2000*(itemNow));
}

function testCameraVideo(){
	addItem("摄像头录像::<span id='CameraVideo'>正在打开摄像头</span>","waiting");
	RCU.Camera.video(JSON.stringify({callbackName:'testCameraVideoCallback'}));
}
function testCameraVideoCallback(jsonString) {
	var json = JSON.parse(jsonString);
	  setTimeout(function(){
		  	resetItemStatus("CameraVideo",true,"(00)");
		},2000*(itemNow));
}
function testAudioPlay(){
	if (typeof RCU.Audio == "undefined"){
		addItem("喇叭播放声音::该接口未实现","error");
		return;
	}
	//检测播放声音方法
	var mp3Url=XJL.getProjectURL()+"/sound/tishiyin.mp3";
	console.log("mp3Url:"+mp3Url);
	RCU.Audio.play(JSON.stringify({url:mp3Url,callbackName:'testAudioPlayCallback'}));
	
}
function testAudioPlayCallback(code, message){
	if (code=="00"){
		//继续检测播放文字
		RCU.Audio.playText(JSON.stringify({text:"请刷身份证",callbackName:'testAudioPlayTextCallback'}));
	} else {
		var ok = "ok";
		if (code != "00"){
			ok = "error";
		}
		addItem("喇叭播放声音::" + message,ok);
	}
}
function testAudioPlayTextCallback(code, message){
	var ok = "ok";
	if (code != "00"){
		ok = "error";
	}
	addItem("喇叭播放声音::" + message,ok);
}
function testBarCode(){
	if (typeof RCU.BarCode == "undefined"){
		addItem("扫码::该接口未实现","error");
		return;
	}
	addItem("扫码::<span id='BarCode'>正在扫码</span>","waiting");
	RCU.BarCode.scan(JSON.stringify({callbackName:'testBarCodeCallback',timeoutSeconds:10}));
	
}
function testBarCodeCallback(jsonString){
	console.log("testBarCodeCallback："+jsonString)
	var json = JSON.parse(jsonString);
	setTimeout(function(){
		var success = true;
		var message = "";
		if (json.state=="ok"){
			success = true;
			message = "扫码结果:"+json.data.code;
		} else {
			success = false;
			message = json.error.code + ":" + json.error.message;
		}
		resetItemStatus("BarCode",success,message);
	},2000*(itemNow));
}
//排队取号机
function detectionPDQHJ(){
	addTitle("A1","排队取号机",4);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	testThermoPrinter();
	testAudioPlay();
}
//电子宣传屏
function detectionDZXCP(){
	addTitle("A2","电子宣传屏",1);
	cleanGroup();
	testTerminalInfo();
	//testAudioPlay();
}
//大厅导航机
function detectionDTDHJ(){
	addTitle("A3","大厅导航机",4);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	testThermoPrinter();
	testAudioPlay();
	
}//自助办理终端
function detectionZZBLZD(){
	addTitle("B1","自助办理终端",8);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	testHSICatch();
	testThermoPrinter();
	testA4PrinterPrintUrl();
	testCameraOpen();
	testAudioPlay();
	testBarCode();
}//自助打表终端
function detectionZZDBZD(){
	addTitle("B2","自助打表终端",5);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	testA4PrinterPrintUrl();
	testCameraOpen();
	testAudioPlay();
	
}//自助取证终端
function detectionZZQZZD(){
	addTitle("B3","自助取证终端",	5);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	testA4PrinterPrintUrl();
	testCameraOpen();
	testAudioPlay();
}
function detectionCKZHSLZD(){
	addTitle("C3","窗口综合受理终端",	6);
	cleanGroup();
	testTerminalInfo();
	testIDCardReader();
	testA4PrinterPrintUrl();
	testCameraOpen();
	testHSICatch();
	testAudioPlay();
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
			//包含状态为waiting的
			$("#detectionContentGroup").append($('<li class="list-group-item list-group-item-warning"><span class="badge" style="color:white">&nbsp;&nbsp;..&nbsp;&nbsp;</span>'+item+'</li>'));
			
		}
		showProgressbar();
	},2000*(++itemNow));

}
function showProgressbar(){
	console.log("显示进度条:",itemNow);
	var value = Math.round((itemSuccess/itemCount).toFixed(2)*100);
	$("#progressbar").attr("aria-valuenow",value);
	$("#progressbar").attr("style","width: "+value+"%");
	$("#progressbar").empty();
	$("#progressbar").append($("<span>"+value+"% Complete (success)</span>"));
	if (value == 100){
		$("#detectionContentTitle").html('检测成功 <a href="#" id="deployTerminal" onclick="deployTerminalAs()"></a>');
		$("#deployTerminal").text("点击发布该为设备为" + itemTitle + "类型");
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
function deployTerminalAs(){
	if (!$("#deployTerminal").text()){
		console.log("内容为空，不处理点击事件");
		return;
	}
	var json = JSON.parse(RCU.Terminal.info());
	$.restPut({
        url: 'rest/cdcTerminal/deploy/'+itemCode + '/'+json.data.terminal,
        success: function (data, status) {
        	$("#terminalType").text("类型:"+itemTitle);
        	$("#deployTerminal").text("");
        	$("#detectionContentTitle").html('发布成功:' + itemTitle);
        }
    });
};