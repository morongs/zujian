var dataList = [
	{
		"_title": "服饰 —— 服装模板",
		"_no": "A001",
		"_url": "1.jpg"
	},
	{
		"_title": "农业 —— 蔬菜模板",
		"_no": "A002",
		"_url": "2.jpg"
	},
	{
		"_title": "汽车 —— 轮胎模板",
		"_no": "A003",
		"_url": "3.jpg"
	},
	{
		"_title": "服饰 —— 服装模板",
		"_no": "A004",
		"_url": "1.jpg"
	},
	{
		"_title": "农业 —— 蔬菜模板",
		"_no": "A005",
		"_url": "2.jpg"
	},
	{
		"_title": "汽车 —— 轮胎模板",
		"_no": "A006",
		"_url": "3.jpg"
	},
	{
		"_title": "服饰 —— 服装模板",
		"_no": "A007",
		"_url": "1.jpg"
	},
	{
		"_title": "农业 —— 蔬菜模板",
		"_no": "A008",
		"_url": "2.jpg"
	},
	{
		"_title": "汽车 —— 轮胎模板",
		"_no": "A009",
		"_url": "3.jpg"
	}
];


// 获取id
function $$(id) {
	return document.getElementById(id);
}

// 设置构造函数
function SetData(elCon,elPage,data, view) {
	this.elCon =  $$(elCon);		// 页面内容元素
	this.elPage = $$(elPage);		// 分页导航元素
	this.data = data;		// 数据列表
	this.strNav = "";	// 存储分页导航选项
	this.i = 0;			// 当前页
	this.view = view;		// 默认一页显示多少
}
// 设置原型方法
SetData.prototype = {
	constructor: SetData,	// 指向构造函数
	// 分页函数
	setPageNav: function() {
		var len = this.data.length;
		for (var i = 0; i < Math.ceil(len/this.view); i++) {
			// 设置分页
			this.strNav += "<li>"+(i+1)+"</li>";
		}
		// 插入分页
		this.elPage.innerHTML = this.strNav;
		this.elPage.getElementsByTagName("li")[0].className = "on";
	},
	// 页面数据
	setPageData: function() {
		// 获取当前所在页面
		var num = this.i*this.view,
			// 如果超过长度，则获取最后的长度
			len = (num+this.view < this.data.length) ? num+this.view : this.data.length,
			strHTML = "";	// 初始化,用于存储内容
		// 遍历获取数据并设置当前页面内容
		for (var i = num; i < len; i++) {
			var _url = this.data[i]._url,
				_no = this.data[i]._no,
				_title = this.data[i]._title;
			// 设置对应的属性及内容
			strHTML += "<li>"+
				"<img src="+_url+" alt="+_title+" title="+_title+" />"+
				"<h2>"+_title+"<span>NO."+_no+"</span></h2>"+
			"</li>\r\n";
		}
		this.elCon.innerHTML = strHTML;
	},
	// 设置分页按钮
	setBtn: function() {
		// 获取分页按钮
		var li = this.elPage.getElementsByTagName("li"),
			len = li.length,
			_self = this;	// 保存对象
		// 添加点击事件
		this.elPage.onclick = function(ev) {
			var ev = ev || window.event,
				target = ev.target || ev.srcElement;
			// 如果点击的是LI
			if (target && target.nodeName === "LI") {
				var cur = parseInt(target.innerHTML);		// 获取当前点击事件内容
				// 遍历内容，移除当前类
				for (var j = 0; j < len; j++) {
					// 使用className 为了兼容IE7以下
					if (li[j].getAttribute("class") === "on" || li[j].getAttribute("className") === "on") {
						li[j].className = "";
						break;		// 退出循环
					}
				}
				li[cur-1].className = "on";	// 设置当前位置
				_self.i = cur-1;			// 设置当前页
				_self.setPageData();		// 调用获取内容函数
			}
		}
	},
	// 初始化
	init: function() {
		this.setPageNav();		// 设置分页导航
		this.setPageData();		// 设置分页内容
		this.setBtn();			// 设置分页按钮
	}
};

// 初始化对象
var setData = new SetData("data","page",dataList, 3);
setData.init();		// 初始化数据

