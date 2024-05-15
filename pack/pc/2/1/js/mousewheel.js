(function(window, undefined) {

	/* **************************************
	* 屏幕滚轮换屏构造函数
	************************************** */
	function MouseWheelFun(opts) {
		this.main = opts.main;	// 总内容
		this.nav = opts.nav;	// 导航按钮
		this.nextBtn = opts.nextBtn;	// 向下按钮
		this.topBtn = opts.topBtn;	// 回到顶部按钮
		this.toTime = opts.toTime;	// 移动时间
		this.tag = this.main.getElementsByTagName(opts.tag);	// 获取元素名
		this.cur = opts.cur;	// 当前类名
		this.len = this.tag.length;		// 元素长度
		this.idx = 0;	// 当前位置
		this.scrollLock = true;		// 防止多次滚动
	}
	MouseWheelFun.prototype = {
		constructor: MouseWheelFun,
		getDotNav: function() {
			var srcHTML = '';
			for (var i = 0; i < this.len; i++) {
				srcHTML += '<li></li>';
			}
			this.nav.innerHTML = srcHTML;
			this.navLi = this.nav.getElementsByTagName("li");
			morong.addClass(this.navLi[0], this.cur);
			this.navEvent();
		},
		navEvent: function() {
			var _self = this;
			// 添加导航点击事件
			morong.addHandler(_self.nav, "click", function(event) {
				var evt = event || window.event,
				target = evt.target ? evt.target : evt.srcElement;
				if (target.nodeName.toLowerCase() == "li") {
					// 判断点击索引
					for (var i = 0; i < _self.len; i++) {
						if (_self.navLi[i] == target) {
							_self.idx = i;
							_self.sliderAni();
						}
					}
				}
			});
		},
		addEvent: function(ele, fun) {
			(/firefox/i).test(navigator.userAgent) ? 
			ele.addEventListener("DOMMouseScroll", fun, false) : 
			ele.onmousewheel = fun;
		},
		keyDownEvent: function(event) {
			var evt = event || window.event,
				code = evt.keyCode || evt.which || evt.charCode,
				_self = this;
			switch (code) {
				// 向上
				case 38:
					_self.wheelDirection(-3);
					break;
				// 向下
				case 40: 
					_self.wheelDirection(3);
					break; 
			};
		},
		wheelDirection: function(detail) {
			var _self = this;
			switch (detail) {
				// 向下
				case 3:
					if (_self.idx < _self.len - 1 && _self.scrollLock == true) {
						_self.idx++;
						_self.sliderAni();
					}
					break;
				// 向上
				case -3:
					if (_self.idx > 0 && _self.scrollLock == true) {
						_self.idx--;
						_self.sliderAni();
					}
					break;
				case 0:
					_self.idx = 0;
					_self.sliderAni();
					break;
			}
		},
		// 切换动画
		sliderAni: function() {
			var _self = this;
			_self.scrollLock = false;
			_self.main.style.webkitTransform = _self.main.style.MozTransform = _self.main.style.transform = 'translateY(-'+(_self.idx * 100)+'%)';
			_self.main.style.webkitTransition = _self.main.style.MozTransition = _self.main.style.transition = 'all '+_self.toTime+'ms ease-in-out';
			// 导航添加当前类
			morong.removeAllClass(_self.navLi, _self.cur);
			morong.addClass(_self.navLi[_self.idx], _self.cur);
			setTimeout(function() {
				// 锁定解除
				_self.scrollLock = true;
				// 内容添加当前类
				morong.removeAllClass(_self.tag, _self.cur);
				morong.addClass(_self.tag[_self.idx], _self.cur);
			}, _self.toTime);
		},
		init: function() {
			var _self = this;
			_self.getDotNav();
			_self.addEvent(document, function(event) {
				var evt = event || window.event;
				var detail = evt.detail || parseInt(-evt.wheelDelta / 40);
				_self.wheelDirection(detail);
			});
			// 键盘方向键
			document.onkeydown = function(event) {
				_self.keyDownEvent(event);
			};
			// 点击下一个页按钮
			for (var i=0, len=_self.nextBtn.length; i<len; i++) {
				(function(i) {
					_self.nextBtn[i].onclick = function() {
						_self.wheelDirection(3);
					}
				})(i);
			}
			// 回到顶部
			_self.topBtn.onclick = function() {
				_self.wheelDirection(0);
			};
		}
	};
	new MouseWheelFun({
		main : morong.$$("main"),
		nav : morong.$$("dotNav"),
		nextBtn : morong.getClass(document.body, "next-btn"),
		topBtn : morong.$$("topBtn"),
		tag : "article",
		cur : "on",
		toTime : 800
	}).init();

})(window);