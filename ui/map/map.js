mui.init({
	keyEventBind: {
		backbutton: false,
		menubutton: false
	},
	gestureConfig: {
		longtap: true
	}
});
var VehiID = "123";
var PlatNum = "xiangA12314";

var getOneDeli = "http://202.197.58.203:8080/opt-delivery/getOneDeli";
var GPSserver = "http://202.197.58.203:8080/opt-delivery/vm_gpsServlet";
var driverServer = "http://202.197.58.203:8080/opt-delivery/driverSever";
var ot_delischemeServlet = "http://202.197.58.203:8080/opt-delivery/ot_delischemeServlet";

var bmap = null;
var wid="432502199008206517";
var picks =[];
var pickCount=0;
var currentDel =null;

mui.plusReady(function() {

	window.addEventListener('swiperight', function() {
		qiao.h.indexPage().evalJS("opMenu();");
	});
	
	
	var wid = plus.storage.getItem("wid");
	if (wid != null) {
		login(wid);
	}
	//	login
	qiao.on('#person', 'tap', function(e) {
		qiao.h.prompt('IDNum', function(IDNum) {
			login(IDNum);
		}, function() {});
	});
	
	initmap();
	locationMe();

	window.addEventListener('uplaodCanvasSucc',uplaodCanvasSuccHand);
	getTaskList();

});

function getTaskList(){
	var Vechicle = "1223";
	mui.ajax(ot_delischemeServlet,{
			data:{
				'Vechicle':Vechicle
			},
			type:"post",
			success:function(d){
//				alert(d);
				var data = JSON.parse(d);
				if(data.succ=="true"){
					initTaskList(eval(data.list));
				}else{
					return;
				}
			},
			error:function(){
				alert('ere');
			}
		});	
}

function initTaskList(list){
//	alert(list.length);
	var $ul = $('#list').empty();
	for (i = 0; i < list.length; i++) {
		$ul.append(genLi(list[i]));
	}
//	showList($ul);
}
function genLi(item){
//	alert(item.PickID);
	var title = "编号："+item.ID;
	var PickIDs = item.PickID.split(";");
	var Addresses = item.Address.split(";");
	var subUL =$( '<ul class="mui-table-view mui-table-view-chevron" style="font-size:12px;"> </ul>');
	for(var i=0;i<PickIDs.length;i++){
		var subLI = '<li class="mui-table-view-cell" data-pickid="'+PickIDs[i]+'">'
				+'<a>'+Addresses[i]+'</a></li>';
		var $subLI = $(subLI);
		$subLI.on('tap',function(e){
			var PickID = $(this).data("pickid");
			showCanvas(PickID);
			e.stopPropagation();
		});	
		
		subUL.append($subLI);
	}
	
	var li = '<li class="mui-table-view-cell mui-collapse" data-delid="'+item.ID+'">'
		+'<a class="mui-navigate-right" >'+title+'</a>'
		+'</li>';
	
	var $li = $(li).on('tap',function(e){
		var id = $(this).data("delid");
		getRotue(id);
	});
	$li.append(subUL);
	return $li;
}


function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}

function uplaodCanvasSuccHand(){
	pickCount++;
	if(pickCount<picks.length){
		showPSinfo(picks[pickCount]);
	}
}

function login(IDNum) {
	IDNum=wid;
	mui.ajax(driverServer, {
		data: {
			'IDNum': IDNum
		},
		type: "post",
		success: function(d) {
//			alert(d);
			var data = JSON.parse(d);
			if (data.isDriver==true) {
				var info = JSON.parse(data.info);
				saveDriver(info.IDNum);
				showDriverInfo(info);
			} else {
				alert('登录失败');
			}

		},
		error: function() {
			alert('登录失败');
		}
	});
}

function showDriverInfo(data) {
//	alert(data.ID);
	var div = $("#uname").empty();
	var html = '<a> 姓名: ' + data.Name + '</a>';
	div.append($(html));
}

function saveDriver(IDNum) {
	plus.storage.clear();
	plus.storage.setItem("IDNum", IDNum);
}

function getRotue(id) {
	mui.ajax(getOneDeli,{
		data:{
			'ID':id
		},
		type:"post",
		success:function(d){
//			alert(d);
			var data = JSON.parse(d);
			if(data.succ==true){
				var OilPick = JSON.parse(data.OilPick);
				bmap.clearOverlays();
				var pts=getcoords(data["OilPick"],data["storage"]);
				changMapView(pts);
				drawStorage(data["storage"],data["Sche"]);
				drawPickAdress(data["OilPick"]);
				
				showDrivingRoute(pts);
			}else{
//				alert("no infomation");
			}
		},error:function(d){alert(d);}
	});
}

function isArrived(){
	
}

function showCanvas(id){
	var PickID = id;
	qiao.h.indexPage().evalJS('showCanvasOKbtn();');
	qiao.h.show('canvas', 'slide-in-bottom', 300);
	qiao.h.fire('canvas','PickID',{PickID:PickID});
}

function checkGPS() {
	plus.geolocation.getCurrentPosition(function(p) {

		var date = new Date();
		var _data = {
			"VehiID": VehiID,
			"PlatNum": PlatNum,
			"PushTime": date.toDateString(),
			"Lon": p.coords.longitude,
			"Lat": p.coords.latitude
		};
		mui.ajax(GPSserver, {
			data: {
				'data': JSON.stringify(_data)
			},
			type: "post",
			success: function(d) {
				var data = JSON.parse(d);
				if (data.succ == false) {

				} else {
//					alert(data.err);
				}
			},
			error: function() {

			}
		});
	}, function(e) {

	});
}

function initmap() {
	if (typeof BMap == "undefined") {
		alert(" 请打开网络连接");
		return;
	}
	bmap = new BMap.Map("map");
	bmap.centerAndZoom(new BMap.Point(112.95800, 28.19840), 14);
	setInterval(function(){checkGPS();}, 15000);
}

function drawStorage(d1,d2){
//	alert(d1);
	var storageInfo = JSON.parse(d1);
	var ScheInfo = JSON.parse(d2);
	var point = new BMap.Point(storageInfo.LON,storageInfo.LAT);
	drawLable(point,"装油地点"+storageInfo.Adress+",数量："+ScheInfo.OilType);

}

function drawPickAdress(d){
	picks=[];
	pickCount=0;
	var data = JSON.parse(d);
	for(var i=0;i<data.length;i++){
//		alert(data[i]["map"].PickID);
		var pickItem = data[i]["map"].pickItem;
		var point = new BMap.Point(pickItem.LON,pickItem.LAT);
		var txt = "交货地址："+i+""+pickItem.DeliPlace+"\n";	
		drawLable(point,txt);
		picks[i] =pickItem;
	}
//	showPSinfo(picks[pickCount]);
}

function drawLable(point,text){
	var opts = {
	  position : point,    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(-30, -40)    //设置文本偏移量
	}
	var label = new BMap.Label(text, opts);  // 创建文本标注对象
		label.setStyle({
			 color : "red",
			 fontSize : "12px",
			 height : "20px",
			 lineHeight : "20px",
			 fontFamily:"微软雅黑"
		 });
		 
	bmap.addOverlay(new BMap.Marker(point));
	bmap.addOverlay(label); 
}
function locationMe() {

	if (typeof bmap == undefined) {
//		alert("bmap 请打开网络连接");
		var maudio = document.getElementById("audio");
    	maudio.src = "audio/neterr.wav";
    	maudio.play(); //播放控制函数
		return;
	}
	plus.geolocation.getCurrentPosition(function(p) {
		var point = new BMap.Point(p.coords.longitude,p.coords.latitude);
		bmap.addOverlay(new BMap.Marker(point));
		bmap.centerAndZoom(point);
	}, function(e) {
//		alert("check gps");
	var maudio = document.getElementById("audio");
    	maudio.src = "audio/gpserr.wav";
    	maudio.play(); //播放控制函数
	});
}

function showDrivingRoute(pts){
	var driving = new BMap.DrivingRoute(bmap, {
			renderOptions:{
				map: bmap, 
				autoViewport: true
			},
			onPolylinesSet:function(routes){
				var line = routes.getPolyline();
			}
		});
	var start = pts[0];
	var end = farrstPoint(pts);
	var len =pts.length;
	var waypts = pts.slice(1,len);
	driving.search(start, end,{waypoints:waypts});//waypoints表示途经点
}
function sdistance(p1,p2){
	return (bmap.getDistance(p1,p2)).toFixed(2);
}

function farrstPoint(pts){
	var pt = null;
	var maxdis=0;
	for(var i =1;i<pts.length;i++){
		var dis = sdistance(pts[0],pts[i]);
		if(maxdis<dis){
			pt = pts[i];
			maxdis = dis;
		}
	}
	return pt;
}

function getcoords(d1,d2){
//	alert(d1);alert(d2);
	var pts =[];
	var storageInfo = JSON.parse(d2);
	var storagePt = new BMap.Point(storageInfo.LON,storageInfo.LAT);
	pts.push(storagePt);
//	alert(pts.length);
	var des = JSON.parse(d1);
	for(var i=0;i<des.length;i++){
		var pickItem = des[i]["map"].pickItem;
		var point = new BMap.Point(pickItem.LON,pickItem.LAT);
		pts.push(point);
	}
	return pts;
}
function changMapView(pts){
   setTimeout(function(){
            bmap.setViewport(pts);          //调整到最佳视野
   },1000);
}