mui.init({
	keyEventBind : {
		backbutton : false,
		menubutton : false
	},
	gestureConfig : {
		longtap:true
	}
});


var bmap = null;
var gps = false;
var opts = {
	  width : 200,     // 信息窗口宽度
	  height: 100,     // 信息窗口高度
	  title : "test" // 信息窗口标题
//	  enableMessage:true,//设置允许信息窗发送短息
	}

mui.plusReady(function(){
	
	window.addEventListener('swiperight', function(){
		qiao.h.indexPage().evalJS("opMenu();");
	});
	
	initmap();
//	checkGPS();
//	locationMe();		
	
	//	login
	qiao.on('#person','tap',function(e){
		qiao.h.show('login','slide-in-bottom',300);
		qiao.h.indexPage().evalJS("showBackBtn();");
//		qiao.h.fire('login','login',{});
	});
	
	//显示配送信息
	window.addEventListener('psShow',psShow);
	
	window.addEventListener('loginSucc',function(e){
		qiao.h.indexPage().evalJS('hidePage();');
//		qiao.h.indexPage().evalJS('openMenu();');
		var name = e.detail.uname;
		var psw = e.detail.psw;
//		alert(name);
		$("#uname").text(name);
		plus.storage.clear();
		plus.storage.setItem("username",name);
		plus.storage.setItem("psw",psw);
	});
});
function psShow(e){
	var data = e.detail;
//	alert(data.lines[0]);
	drawPSline(data.psid);
	showPSinfo(data.psid);
}
function showPSinfo(id){
	var infoWindow = new BMap.InfoWindow(id,opts);
	bmap.openInfoWindow(infoWindow,new BMap.Point(111, 30));
}
function drawPSline(lines){
	var polyline = new BMap.Polyline([
			new BMap.Point(111.399, 39.910),
		   	new BMap.Point(116.405, 30.920)    
		],{
			strokeColor:"blue", 
			strokeWeight:6, 
			strokeOpacity:0.5
		});
	bmap.addOverlay(polyline);
	bmap.centerAndZoom(new BMap.Point(111, 30), 5);
}
function checkGPS(){
	plus.geolocation.getCurrentPosition(function(p){
		gps = true;
	}, function(e){
		gps = false;
		alert( "Geolocation error: " + e.message );
	});
}
function initmap(){
	if(typeof BMap =="undefined"){
		alert("bmap 请打开网络连接");
		return;
	}
  	bmap=new BMap.Map("map");
    bmap.centerAndZoom(new BMap.Point(111, 30), 5);      
    bmap.addOverlay(new BMap.Marker(new BMap.Point(111, 30)));
    
//  closeInfoWindow();
//getInfoWindow();
}


function locationMe(){
	if(!gps){
		alert("gps error");
		return;
	}
	if(typeof bmap ==undefined){
		alert("bmap 请打开网络连接");
		return;
	}
	bmap.clearOverlays();
	var geo = plus.geolocation;
	var pos = geo.coords;
	var pt = new BMap.Point(pos.longitude,pos.latitude);
}


//function clear
