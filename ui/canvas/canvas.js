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
mui.plusReady(function(){
	canvas =null;
	canvas = document.getElementById("sign");
	cW = window.innerWidth;
	cH = window.innerHeight-36;
	canvas.width=cW;
	canvas.height= cH;
	
	ctx = canvas.getContext("2d");
	ctx.lineWidth = 10;
	ctx.strokeStyle="#FF0000";
	
	window.addEventListener('clearCanvas',function(e){
		ctx.clearRect(0,0,cW,cH);
	});
	canvas.addEventListener('touchstart',touchStart);
	canvas.addEventListener('touchmove',touchMove);
});


function touchStart(e){
	e.preventDefault();
	lastX=event.touches[0].clientX;
	lastY=event.touches[0].clientY;
	drawPoint(lastX,lastY);
}

function touchMove(e){
	try{
	
	e.preventDefault();
	drawLine(lastX,lastY,e.touches[0].clientX,e.touches[0].clientY);
	lastX=e.touches[0].clientX;
	lastY=e.touches[0].clientY;
	
	
	}catch(err){
	alert( err.description);}
	
	
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




