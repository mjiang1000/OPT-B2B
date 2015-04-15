// 初始化
mui.init({
	keyEventBind : {
		backbutton : false
	}
});

var indexPage=null;
mui.plusReady(function(){

	plus.navigator.setCookie( "yy", "workerID=123;" );
	var v = plus.navigator.getCookie("yy");
//	alert(typeof v);
//	getTaskList();
	var smapleJSON = {"0":[
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
	]}
	initTaskList(smapleJSON["0"]);
	
//	
//	// 添加已完成事项
//	window.addEventListener('doneItem', doneItemHandler);
});


function initTaskList(obj){
	
	var $ul = $('#taskList').empty();
	for (i = 0; i < obj.length; i++) {
		$ul.append(genLi(obj[i].psid));
//		showList($ul);
	}
	
//	$ul.on('click','li',function(e){
//		var li = e.target;
//		//getPSinfo();
//		drawPSline();
//		//
//		showPSinfo();
//	});

	$ul.on('tap','li',function(e){

		var title = this.innerText;
		if( indexPage == null){
			indexPage=qiao.h.indexPage();

		}
//		alert(title);
		mui.fire(indexPage,'psId',{'id':'2015-2-01-123'});
		mui.fire(indexPage,'psLujin',{'id':'2015-2-01-123'});
	});
	
	qiao.on('#login','tap',function(e){

	});
}
function genLi(psid){
var title = "配送编号："+psid;
var li = '<li class=\"mui-table-view-cell\"><a class=\"mui-navigate-right\" href="#">'+title+'</a></li>';
	return $(li);
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}




