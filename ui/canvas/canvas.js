mui.init({
	keyEventBind : {
		backbutton : false,
		menubutton : false
	}
});
var canvas = null;
var ctx = null;
var lastX,lastY;
var cW,cH;
//202.197.58.203
//192.168.253.1
var server="http://202.197.58.203:8080/opt-delivery/canvasServer";
var ot_oilpickServlet = "http://202.197.58.203:8080/opt-delivery/ot_oilpickServlet";
var PickID="";
//var files=[];
mui.plusReady(function(){
	canvas =null;
	canvas = document.getElementById("sign");
	cW = window.innerWidth-160;
	cH = window.innerHeight;
	canvas.width=cW;
	canvas.height= cH;
	
	ctx = canvas.getContext("2d");
	ctx.lineWidth = 10;
	ctx.strokeStyle="#FF0000";
	
	window.addEventListener('clearCanvas',function(e){
		clearCanvas();
	});
	window.addEventListener('PickID',function(e){
		PickID = e.detail.PickID;
		getPickTaskInfo(PickID);
	});

	canvas.addEventListener('touchstart',touchStart);
	canvas.addEventListener('touchmove',touchMove);
//	qiao.on(".mui-icon-checkmarkempty","tap",upload);
});
function getPickTaskInfo(id){
	mui.ajax(ot_oilpickServlet,{
			data:{
				'PickID':id
			},
			type:"post",
			success:function(d){
//				alert(d);
				var data = JSON.parse(d);
				if(data.succ==true){
					showDetail(JSON.parse(data["pick"]));
				}else{
					return;
				}
			},
			error:function(){

			}
		});
}

function showDetail(data){

	var ul = $("#detail").empty();
	var html = '<li class="mui-table-view-divider">收货地址:'+data.DeliPlace+'</li>'
				+'<li class="mui-table-view-divider">收货时间:'+data.PickTime+'</li>'
				+'<li class="mui-table-view-divider">'+data.OilType+''+data.OilNum+'t</li>'
				+'<li class="mui-table-view-divider">收货人:'+data.PickMan+'</li>'
				;
	ul.append($(html));
	$("#okAndUpload").on('tap',upload);
}
function upload(){
	qiao.h.waiting('uploading....');
	var imgData = canvas.toDataURL("image/png");
//	alert(imgData);
//alert(orderID);
	if(PickID==""){
		alert("error");
	}
	mui.ajax(server,{
			data:{
				'img':imgData.replace(/^data:image\/(png|jpg);base64,/, ""),
				'PickID':PickID
			},
			type:"post",
			success:function(data){
				qiao.h.closeWaiting();
//				qiao.h.indexPage().evalJS('hideBackBtn();');
				alert("上传成功");
				clearCanvas();
				PickID="";
				qiao.h.fire('map','uplaodCanvasSucc',{});
			},
			error:function(data){
				qiao.h.closeWaiting();
				PickID="";
				alert(data);
			}
	});
}

function clearCanvas(){
	ctx.clearRect(0,0,cW,cH);
}
function touchStart(e){
	e.preventDefault();
	lastX=event.touches[0].clientX-160;
	lastY=event.touches[0].clientY;
	drawPoint(lastX,lastY);
}

function touchMove(e){
	try{
		e.preventDefault();
		drawLine(lastX,lastY,e.touches[0].clientX-160,e.touches[0].clientY);
		lastX=e.touches[0].clientX-160;
		lastY=e.touches[0].clientY;
	}catch(err){
		alert( err.description);
	}
}

function drawPoint(x,y){
	ctx.fillStyle="#FF0000";
	ctx.beginPath();
	ctx.arc(x,y,5,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
}

function drawLine(startX,startY,endX,endY){
	ctx.beginPath();
	ctx.lineCap="round";
	ctx.moveTo(startX,startY);
	ctx.lineTo(endX,endY);
	ctx.stroke();
}




