// loading 加载页面 begin
var load = document.getElementById('loading'),
	progress = document.getElementById('loading_rate');
// 加载图片资源
var loadingImage = (function() {

	var img_list = [
		'box-bg1.jpg'
	];
	var img_len = img_list.length,
		imgPath = './images/',
		load_num = 0,
		imgArr = [];
	for (var i = 0; i < img_len; i++) {
		imgArr.push(imgPath + img_list[i]);
	}
	function loadImage(path, callback) {
		var img = new Image();
		img.src = path;
		img.onload = function() {
			img.onload = null;
			callback && callback();
		};
	}
	function imgLoader(imgs, callback) {
		var len = imgs.length, i = 0;
		while (imgs.length) {
			loadImage(imgs.shift(), function() {
				callback && callback(++i, len);
			});
		}
	}
	imgLoader(imgArr, function(curNum, len) {
		load_num = curNum / len;
		progress.innerHTML = Math.floor(load_num * 100);
		if (load_num == 1) {
			setTimeout(function() {
				load.style.opacity = 0;
				setTimeout(function() {
					load.style.display = 'none';
				}, 200);
			}, 500);
		}
	});

})();
// loading 加载页面 end


$(function() {

	var hasTouch = 'ontouchstart' in window ? true : false,
		touchStart = hasTouch ? 'touchstart' : 'mousedown',
		touchMove = hasTouch ? 'touchmove' : 'mousemove',
		touchEnd = hasTouch ? 'touchend' : 'mouseup';

	// **************************************
	// 触摸切换屏幕内容构造函数
	// **************************************
	function TouchSliderVer(obj) {
		this.touch = obj.touch;		// 触摸元素
		this.slider = obj.slider;	// 移动切换元素
		this.box = this.slider.find(obj.box);		// 内容元素
		this.len = this.box.length; 	// 切换长度
		this.aniTime = obj.aniTime;		// 滑动时间
		this.arrow = obj.arrow;			// 箭头
		this.h = $(window).height();	// 屏幕高度
		this.startY = 0;				// 触摸开始位置
		this.moveY = 0;					// 触摸经过
		this.curY = 0;					// 当前移动位置
		this.i = 0;						// 当前位置
		this.flag = false;				// 设置pc移动鼠标
	}
	// 原型方法
	TouchSliderVer.prototype = {
		constructor:TouchSliderVer,
		// 移动页面
		translateFun: function(y, s, flag) {
			var _self = this;
			// 如果是松开手，则获取对应的位置
			if (flag) {
				this.curY = -(this.i * this.h);		// 获取屏幕高度，并移动对应屏
				y = this.curY;
			}
			this.slider.css({
				"-webkit-transform": "translate3d(0,"+y+"px,0)",
				"transform": "translate3d(0,"+y+"px,0)",
				"-webkit-transition-duration": s+"ms",
				"transition-duration": s+"ms"
			});
			// 延迟变化内容
			setTimeout(function() {
				_self.box.removeClass("show").eq(_self.i).addClass("show");
			}, _self.aniTime);
		},
		// 触摸开始
		touchStartFun : function(e) {
			var e = e || window.event;
			this.startY = parseInt(hasTouch ? e.touches[0].pageY : e.clientY);
			this.flag = true;
		}, 
		// 触摸移动
		touchMoveFun : function(e) {
			if (!this.flag) return;

			var e = e || window.event, y;

			this.moveY = parseInt(hasTouch ? e.touches[0].pageY : e.clientY);
			y = this.moveY - this.startY + this.curY;	// 计算移动距离
			this.translateFun(y, 0, false);
		}, 
		// 触摸结束
		touchEndFun : function(e) {
			// 如果是第一屏
			if (this.moveY - this.startY > 0 && this.i == 0) {
			} else if (this.moveY - this.startY < 0 && this.i == this.len - 1) {
				// 如果是最后一屏
			} else if (this.moveY - this.startY > 80) {
				// 如果高度滑动大于20像素，则向上移动一屏
				this.i--;
			} else if (this.moveY - this.startY < -80) {
				// 如果高度滑动小于20像素，则向下移动一屏
				this.i++;
			}
			// 执行移动位置操作
			this.translateFun(0, this.aniTime, true);
			// 如果到最后一屏，向上箭头隐藏
			(this.i == this.len - 1) ? this.arrow.hide() : this.arrow.show();

			this.flag = false;
		}, 
		// 初始化
		init: function() {
			var _self = this;
			_self.touch.on(touchStart, function(e) {
				_self.touchStartFun(e);
			});
			_self.touch.on(touchMove, function(e) {
				_self.touchMoveFun(e);
			});
			_self.touch.on(touchEnd, function(e) {
				_self.touchEndFun(e);
			});
			// 窗口大小发生变化
			$(window).on('resize', function() {
				_self.h = $(this).height();
				_self.translateFun(0, _self.aniTime, true);
			});
		}
	};
	// 实例化
	var slider = new TouchSliderVer({
		touch: $("#container"),
		slider: $("#main"),
		arrow: $(".arrow"),
		box: ".box",
		aniTime: 500
	});
	slider.init();

});