// 初始化
mui.init({
	subpages : [qiao.h.normalPage('list')]
});

var main = null;
var showMenu = false;
var menu = null;
var add = null;
var detail = null;

// 所有方法都放到这里
mui.plusReady(function(){
	setColor("#f7f7f7");
	
	// 侧滑菜单
	main = qiao.h.indexPage();

	// 添加
	add = mui.preload(qiao.h.normalPage('add', {popGesture:'none'}));
	qiao.on('.adda', 'tap', showAdd);
	qiao.on('.mui-icon-back', 'tap', hideAdd);
	
	// 详情
	//detail = mui.preload(qiao.h.normalPage('detail', {popGesture:'none'}));
});


// showAdd
function showAdd(){
	showBackBtn();
	qiao.h.show('add', 'slide-in-bottom', 300);
}
function hideAdd(){
	hideBackBtn();
	qiao.h.getPage('add').hide();
	qiao.h.getPage('detail').hide();
}
function showBackBtn(){
	$('.adda').hide();
}
function hideBackBtn(){
	$('.adda').show();
}

// set color
function setColor(color){
	if(mui.os.ios && color) plus.navigator.setStatusBarBackground(color);
}