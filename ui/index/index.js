// 初始化
mui.init();

var main = null;
var showMenu = false;
var menu = null;
var add = null;
var detail = null;
var bmap = null;
// 所有方法都放到这里
mui.plusReady(function(){
	// 获取任务
//	getMask();


	// 侧滑菜单
	main = qiao.h.indexPage();
	var menuoptions = qiao.h.page('menu', {
		styles : {
			left:0,
			width:'70%',
			zindex:-1
		}
	});
	menu = mui.preload(menuoptions);
	qiao.on('.mui-icon-bars', 'tap', opMenu);
	main.addEventListener('maskClick', opMenu);
	mui.menu = opMenu;
	initmap();
	 //退出
	mui.back = function(){
		if(showMenu){
			closeMenu();
		}else{
			qiao.h.exit();
		}
	};
	
	
	plus.geolocation.getCurrentPosition(function(pos){
		var codns = pos.coords;
		var lat = codns.latitude;//获取到当前位置的纬度；
		var longt = codns.longitude;//获取到当前位置的经度
		var alt = codns.altitude;//获取到当前位置的海拔信息；
		if(!bmap){
			alert("地图初始化错误");	
		}
		var point = new BMap.Point(longt, lat);  
		bmap.centerAndZoom(point, 16);      
	},function(e){
		alert(e.message);
	});
	
});

function initmap(){

	if(typeof BMap =="undefined"){
//		$("#map").hide();
		alert("bmap 请打开网络连接");
		return;
	}
  	bmap=new BMap.Map("map");
    bmap.centerAndZoom(new BMap.Point(111, 30), 5);         
}	




// menu
function opMenu(){
	if(showMenu){
		closeMenu();
	}else{
		openMenu();
	}
}
function openMenu(){
	if($('.adda').is(':visible')){
		menu.show('none', 0, function() {
			main.setStyle({
				mask: 'rgba(0,0,0,0.4)',
				left: '70%',
				transition: {
					duration: 150
				}
			});
	
			showMenu = true;
		});
	}
}
function closeMenu(){
	main.setStyle({
		mask: 'none',
		left: '0',
		transition: {
			duration: 100
		}
	});
	
	showMenu = false;
	setTimeout(function() {
		menu.hide();
	}, 300);
}


function showBackBtn(){
	$('.menua').removeClass('mui-icon-bars').addClass('mui-icon-back');
	$('.adda').hide();
}
function hideBackBtn(){
	$('.menua').removeClass('mui-icon-back').addClass('mui-icon-bars');
	$('.adda').show();
}