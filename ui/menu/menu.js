// 初始化
mui.init({
	keyEventBind : {
		backbutton : false
	}
});
//var ot_delischemeServlet = "http://202.197.58.203:8080/opt-delivery/ot_delischemeServlet";
var ot_delischemeServlet = "http://202.197.58.203:8080/opt-delivery/ot_delischemeServlet";
var indexPage=null;
mui.plusReady(function(){

	var name = plus.storage.getItem("username");
	var psw = plus.storage.getItem("psw");
	if(!(name==null || psw==null)){
		$("#uname").text(name);
	}

	getTaskList();

	qiao.on('#taskList li','tap',function(e){
		qiao.h.indexPage().evalJS('closeMenu();');
		var psid = $(this).data('psid');
		qiao.h.fire('map','psShow',{'psid':psid});
	});
	
	qiao.on('#history','tap',function(e){
		qiao.h.indexPage().evalJS('closeMenu();');
		qiao.h.indexPage().evalJS('showBackBtn();');
		qiao.h.show('history','slide-in-bottom',300);
	});
	

});
function getTaskList(){
	var Vechicle = "1223";
	mui.ajax(ot_delischemeServlet,{
			data:{
				'Vechicle':Vechicle
			},
			type:"post",
			success:function(d){
				
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
	var $ul = $('#taskList').empty();
	for (i = 0; i < list.length; i++) {
		$ul.append(genLi(list[i].ID));
	}
	showList($ul);
}
function genLi(psid){
	var title = "任务编号："+psid;
	var li = '<li class=\"mui-table-view-cell\" data-psId="'+psid+'">'
		+'<a class=\"mui-navigate-right\" href="#">'+title+'</a></li>';
	return $(li);
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}



