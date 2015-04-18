mui.init({
	gestureConfig : {
		longtap:true
	},
	keyEventBind : {
		backbutton : false,
		menubutton : false
	}
});

mui.plusReady(function(){
//	reset();
	qiao.on('#ok','tap',loginHander);
	qiao.on("#cancel",'tap',function(e){
		reset();
	});
});


function loginHander(e){
	var uname = $("#uname"),
		psw = $("#psw"),
		suname = uname.val(),
		spsw = psw.val();
//	alert(suname);
	if(suname.length <1 || spsw.length <1){
		alert("输入正确的用户名和密码");
		return;
	}
	
//	loginAjax();
	qiao.h.fire('map','loginSucc',{'uname':suname,'psw':spsw});
}

function reset(){
		
	$("#uname").val('');
	$("#psw").val('');
}
