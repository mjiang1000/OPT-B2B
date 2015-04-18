// 初始化
mui.init({
	keyEventBind : {
		backbutton : false
	}
});

var indexPage=null;
mui.plusReady(function(){

	var name = plus.storage.getItem("username");
	var psw = plus.storage.getItem("psw");
	if(!(name==null || psw==null)){
		$("#uname").text(name);
	}
//	login(name,psw);

//	getTaskList();
	var smapleJSON = [
		{
			"psid":"2014-5-1-123-0",
			"time":"14:00",
			"driver":"xiao li",
			"carID":"Axx1234",
			"geo":"",
			"oilType":"93#A",
			"num":4.5,
			"destination":[
				{
					"x":1223,
					"y":1234,
					"nameDescrpt":"xxx化工"
				},{
					"x":1223,
					"y":1234,
					"nameDescrpt":"xxx化工"
				}
			]
		},{
			"psid":"2014-5-1-123-01",
			"time":"16:00",
			"driver":"xiao li",
			"carID":"Axx1234",
			"geo":"",
			"oilType":"93#A",
			"num":4.5,
			"destination":[
				{
					"x":1223,
					"y":1234,
					"nameDescrpt":"xxx化工"
				},{
					"x":1223,
					"y":1234,
					"nameDescrpt":"xxx化工"
				}
			]
		}
		
	];
	initTaskList(smapleJSON);
	
	

	qiao.on('#taskList li','tap',function(e){
		qiao.h.indexPage().evalJS('closeMenu();');
		var psid = $(this).data('psid');
		qiao.h.fire('map','psShow',{'psid':psid,'lines':[1,2]});
	});
	
	qiao.on('#history','tap',function(e){
		qiao.h.indexPage().evalJS('closeMenu();');
		qiao.h.indexPage().evalJS('showBackBtn();');
		qiao.h.show('history','slide-in-bottom',300);
	});
	

});


function initTaskList(obj){
//	alert(obj.length);
	var $ul = $('#taskList').empty();
	for (i = 0; i < obj.length; i++) {
		$ul.append(genLi(obj[i].psid));
	}
	showList($ul);
}
function genLi(psid){
	var title = "配送编号："+psid;
	var li = '<li class=\"mui-table-view-cell\" data-psId="'+psid+'">'
		+'<a class=\"mui-navigate-right\" href="#">'+title+'</a></li>';
	return $(li);
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}



