// 初始化
mui.init({
	subpages : [qiao.h.normalPage('map')]
});
var main = null;
var login = null;
var historyPage = null;
var canvas = null;
var showMenu = false;

// 所有方法都放到这里
mui.plusReady(function(){


	// 侧滑菜单
	main = qiao.h.indexPage();
	var menuoptions = qiao.h.page('menu', {
		styles : {
			left:0,
			width:'50%',
			zindex:-1
		}
	});
	
	
//	menu = mui.preload(menuoptions);
//	qiao.on('.mui-icon-bars', 'tap', opMenu);
//	main.addEventListener('maskClick', opMenu);
//	mui.menu = opMenu;
//	
qiao.on('.mui-icon-bars', 'tap', function(e){
	
});
	historyPage = mui.preload(qiao.h.normalPage('history'));
	canvas = mui.preload(qiao.h.normalPage('canvas'));
	qiao.on('.mui-icon-back', 'tap', hidePage);
	qiao.on('.mui-icon-location','tap',function(e){
		   
	});
	
	
	 //退出
	mui.back = function(){
		if(showMenu){
			closeMenu();
		}else{
			qiao.h.exit();
		}
	};
	
	

	window.addEventListener('psId',function(e){
		var t = e.detail.id;
//		获取送货信息

		closeMenu();
	});
	qiao.on('.mui-icon-checkmarkempty','tap',function(){
		qiao.h.getPage('canvas').evalJS('upload();');
	});
});


// menu
function opMenu(){
	if(showMenu){
		closeMenu();
	}else{
		openMenu();
	}
}
function openMenu(){
	if($('.mui-icon-location').is(':visible')){
		menu.show('none', 0, function() {
			main.setStyle({
				mask: 'rgba(0,0,0,0.4)',
				left: '50%',
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
	$('.mui-icon-location').hide();
}

function showCanvasOKbtn(){
	$('.menua').removeClass('mui-icon-bars').addClass('mui-icon-back');
	$('.mui-icon-location').hide();
	$('.mui-icon-checkmarkempty').css("display","block");
}
function hideBackBtn(){
	$('.menua').removeClass('mui-icon-back').addClass('mui-icon-bars');
	$('.mui-icon-location').show();
	$('.mui-icon-checkmarkempty').css("display","none");
}

function hidePage(){
	hideBackBtn();
	qiao.h.getPage('history').hide();
	qiao.h.getPage('canvas').hide();
	qiao.h.fire('canvas','clearCanvas',{});
}
