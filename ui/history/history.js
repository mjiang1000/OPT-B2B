mui.init({
	keyEventBind : {
		backbutton : false,
		menubutton : false
	}
});

	
mui.plusReady(function(){
	var d=[
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
		}];
		
	var list = $('#hisList');
	for(var i=0;i<d.length;i++){
		var li = '<li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">'+d[i].psid+'</a></li>';
		$li = $(li);
		$li.append(genDetial(d[i]));
		$li.appendTo(list);
	}	
});

function genDetial(data){
	var html = 
		'<ul class="mui-table-view mui-table-view-chevron">' 
	    +'	<li class="mui-table-view-cell">完成时间	'+data.psid +'   </li>'
		+'	<li class="mui-table-view-cell">任务接受时间	'+data.psid +'		</li>'
		+'	<li class="mui-table-view-cell">司机		'+data.driver +'	</li>'
		+'	<li class="mui-table-view-cell">司机			</li>'
			
		+'</ul>';
	
	return $(html);
}




