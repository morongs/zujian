$(function() {

	// ****************************
	// 首页幻灯片
	// ****************************
	// 定义幻灯片构造函数
	function Slider(opts) {
		this.ban = opts.ban;
		this.el = opts.slider;				// 幻灯容器
		this.elLi = this.el.find("li");		// 幻灯
		this.len = this.elLi.length;		// 幻灯长度
		this.elNav = opts.nav;   			// 圆点导航
		this._prev = opts._prev;   			// 上一款产品
		this._next = opts._next;   			// 下一款产品
		this.elNav = opts.nav;   			// 圆点导航
		this.on = opts.on;   				// 当前位置类名
		this._type = opts._type;   				// 切换类型
		this._width = parseInt(this.ban.width());   // 幻灯宽度
		this.i = 0;		// 当前位置
		this.inter = '';		// 定时器
		this._time = opts._time;	// 幻灯片切换时间
	}
	Slider.prototype = {
		constructor: Slider,
		// 移动动画函数
		sliderAni: function() {
			var _self = this;
			if (_self._type == "left") {
				_self.el.animate({
					left: -(_self.i*_self._width)+"px"
				}, 'slow');
			} else if (_self._type == "fadeIn") {
				_self.fadeAni();
			}
			// 设置当前位置
			_self.elNav.find("li").removeClass(_self.on).eq(_self.i).addClass(_self.on);
		},
		fadeAni: function() {
			var j = 0;
			(this.i == 0) ? j = this.len - 1 : j = this.i - 1;
			this.el.find("li:eq("+j+")").fadeOut(400);
			this.el.find("li:eq("+this.i+")").fadeIn(400);
		},
		// 自动轮播函数
		setIntervalAni: function() {
			var _self = this;
			if (_self._time != 0) {
				_self.inter = setInterval(function() {
					(_self.i < _self.len - 1) ? _self.i++ : _self.i=0;
					_self.sliderAni();
				}, this._time);
			}
		},
		prevNextBtn: function(i) {
			var _self = this;
			switch (i) {
				case 1: 		// 下一个
					(this.i < this.len - 1) ? this.i++ : this.i = 0;
					break;
				case 0: 		// 上一个
					(this.i > 0) ? this.i-- : this.i = this.len-1;
					break;
			}
			// console.log(i + " = " + _self.i);
			this.fadeAni();
		},
		sliderNav: function(idx) {
			clearInterval(this.inter);
			this.i = idx;	 // 获取当前索引
			this.sliderAni();			// 调用切换幻灯函数
			this.setIntervalAni();	// 调用自动轮播函数
		},
		init: function() {
			var _self = this;
			// 点击圆点导航
			if (_self.elNav !== null) {
				_self.elNav.find("li").on("click", function() {
					_self.sliderNav($(this).index());
				});
			}
			// 如果上下按钮不为空的话，注册点击事件
			if (_self._prev !== null || _self._next !== null) {
				_self._prev.on("click", function() {
					_self.prevNextBtn(0);
				});
				_self._next.on("click", function() {
					_self.prevNextBtn(1);
				});
			}
			_self.setIntervalAni();
		}
	};
	// 实例化幻灯对象
	new Slider({
		ban: $(".banner"), 
		slider: $(".slider"),
		nav: $(".slider-nav"),
		_prev: null,
		_next: null,
		_type: "left",			// 可选类型 left / fadeIn
		_time: 6000,
		on: "on"
	}).init();

});

