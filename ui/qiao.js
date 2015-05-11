var qiao = {};
qiao.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};

// 对mui以及nativejs相关封装
qiao.h = {};

// page相关
qiao.h.normalStyle = {top:'45px',bottom:0};
qiao.h.centerStyle = {top:'45px',bottom:'50px'};
qiao.h.normalPage = function(id){
	return qiao.h.page(id, {styles : qiao.h.normalStyle});
};
qiao.h.centerPage = function(id){
	return qiao.h.page(id, {styles:qiao.h.centerStyle});
};
qiao.h.page = function(id, options){
	var url = 'view/' + id + '.html';

	options.id = id;
	options.url = url;
	return options;
};
qiao.h.indexPage = function(){
	return plus.webview.getWebviewById(plus.runtime.appid);
};
qiao.h.currentPage = function(){
	return plus.webview.currentWebview();
};
qiao.h.getPage = function(id){
	return id ? plus.webview.getWebviewById(id) : null;
};
qiao.h.show = function(id, ani, time, func){
	if(id) plus.webview.show(id, ani, time, func);
};
qiao.h.hide = function(id, ani, time){
	if(id) plus.webview.hide(id, ani, time);
};
qiao.h.fire = function(id, name, values){
	mui.fire(qiao.h.getPage(id), name, values);
};

// 以下为UI封装------------------------------------------------------------------------------
// nativeui相关
qiao.h.tip = function(msg, options){
	plus.nativeUI.toast(msg,options);
};
qiao.h.waiting = function(titile, options){
	plus.nativeUI.showWaiting(titile, options);
};
qiao.h.closeWaiting = function(){
	plus.nativeUI.closeWaiting();
};

// popover
qiao.h.pop = function(){
	mui('.mui-popover').popover('toggle');
};

// actionsheet
qiao.h.sheet = function(title, btns,func){
	if(title && btns && btns.length > 0){
		var btnArray = [];
		for(var i=0; i<btns.length; i++){
			btnArray.push({title:btns[i]});
		}
		
		plus.nativeUI.actionSheet({
			title : title,
			cancel : '取消',
			buttons : btnArray
		}, function(e){
			if(func) func(e);
		});
	}
};

// 提示框相关
qiao.h.modaloptions = {
	title 	: 'title',
	abtn	: '确定',
	cbtn	: ['确定','取消'],
	content	: 'content'
};
qiao.h.alert = function(options, ok){
	var opt = $.extend({}, qiao.h.modaloptions);
	
	opt.title = '提示';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.alert(opt.content, function(e){
		if(ok) ok();
	}, opt.title, opt.abtn);
};
qiao.h.confirm = function(options, ok, cancel){
	var opt = $.extend({}, qiao.h.modaloptions);
	
	opt.title = '确认操作';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.confirm(opt.content, function(e){
		var i = e.index;
		if(i == 0 && ok) ok();
		if(i == 1 && cancel) cancel();
	}, opt.title, opt.cbtn);
};
qiao.h.prompt = function(options, ok, cancel){
	var opt = $.extend({}, qiao.h.modaloptions);
	
	opt.title = '输入内容';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.prompt(opt.content, function(e){
		var i = e.index;
		if(i == 0 && ok) ok(e.value);
		if(i == 1 && cancel) cancel(e.value);
	}, opt.title, opt.content, opt.cbtn);
};



// 以下为功能封装------------------------------------------------------------------------------
// 退出
qiao.h.exit = function(){
	qiao.h.confirm('确定要退出吗？', function(){
		plus.runtime.quit();
	});
};
// 刷新
qiao.h.endDown = function(selector){
	var sel = selector ? selector : '#refreshContainer';
	mui(sel).pullRefresh().endPulldownToRefresh();
};