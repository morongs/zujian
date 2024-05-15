
;(function($, window, undefined){

	function TouchSlider(opts) {
		this.touch = opts.touch;		// 触摸元素
		this.box = opts.box;			// 列表元素
		this.len = this.box.length;		// 长度
		this.el = opts.el;				// 动画元素类名
		this.ani = opts.ani;			// 执行动画名
		this.dataList = opts.dataList;	// 数据列表
		this.dataLen = this.dataList.length;	// 获取数据长度
		this.h = $(window).height();	// 屏幕高度
		this._prev = 0;					// 上一个
		this._next = 0;					// 下一个
		this.startY = 0;				// 开始触摸位置
		this.moveY = 0;					// 移动触摸位置
		this.active = 0;				// 当前位置
		this.diff = 0;					// 滑动距离
		this.dataId = 0;				// 当前数据位置
		this.flag = false;				// 检测触摸滑动
	}
	TouchSlider.prototype = {
		constructor: TouchSlider,
		// 设置显示顺序
		setBoxZIndex: function(i) {
			var _self = this;
			switch (i) {
				case 0: 
					_self.box.eq(_self.active).css('z-index', 100);
					_self.box.eq(_self.active + 1).css({
						'z-index': 90,
						'-webkit-transform': 'translate3d(0,'+_self.h+'px,0)'
					});
					_self.box.eq(_self.active + 2).css({
						'z-index': 80,
						'-webkit-transform': 'translate3d(0,'+(_self.h*2)+'px,0)'
					});
					break;
				case 1:
					_self.box.css({
						'z-index': 80,
						'-webkit-transition': 'all 0s ease-out',
						'transition': 'all 0s ease-out',
						'-webkit-transform': 'translate3d(0,'+(_self.h*2)+'px,0)',
						'transform': 'translate3d(0,'+(_self.h*2)+'px,0)'
					});
					break;
			}
		},
		// 设置触摸移动动画
		setTouchAni: function(obj) {
			// 如果没有， 采用默认值
			var i = obj.i || 0,
				z = obj.z || 80,
				ms = obj.ms || '0.3s',
				s = obj.s || 1,
				y = obj._y || 0;
			// 执行动画
			this.box.eq(i).css({
				'z-index': z,
				'-webkit-transition': 'all '+ms+' ease-out',
				'transition': 'all '+ms+' ease-out',
				'-webkit-transform': 'scale('+s+') translate3d(0,'+y+',0)',
				'transform': 'scale('+s+') translate3d(0,'+y+',0)'
			});
		},
		// 触摸开始
		touchStart: function() {
			var _self = this,
				touch;
			_self.touch.on("touchstart", function(e) {
				touch = e.touches[0];
				_self.startY = parseInt(touch.pageY);
				_self.diff = 0;		// 距离清空
				_self.flag = false;
			});
		},
		// 触摸移动
		touchMove: function() {
			var _self = this,
				touch, scale;		// 触摸元素及滑动比例
			_self.touch.on("touchmove", function(e) {
				// 阻止默认事件
				e.preventDefault();
				touch = e.touches[0];	
				// 获取触摸信息
				_self.moveY = parseInt(touch.pageY);

				// 滑动距离
				_self.diff = _self.moveY - _self.startY;
				// 缩放比例
				scale = Math.abs(_self.diff * 0.1 / _self.h);

				// 设置显示顺序
				_self.setBoxZIndex(1);

				// 判断滑动方向
				if (_self.diff > 0) {
					// 向下滑动
					_self._prev = (_self.active == 0) ? _self.len - 1 : _self.active - 1;

					_self.setTouchAni({ i: _self._prev, z: 90, s: scale + 0.8, ms: '0s'});
					_self.setTouchAni({ i: _self.active, z: 100, ms: '0s', _y: parseInt(_self.diff * 0.4)+'px'});

					// 获取数据并插入
					if (!_self.flag) {
						_self.flag = true;

						(_self.dataId == 0) ? _self.dataId = _self.dataLen - 1 : _self.dataId--;
						// 插入数据
						_self.addElementCon(_self.dataId, _self._prev, null);
					}

				} else {
					// 向上滑动
					_self._next = (_self.active == _self.len-1) ? 0 : _self.active + 1;

					_self.setTouchAni({ i: _self.active, z: 90, s: 1 - scale, ms: '0s'});
					_self.setTouchAni({ i: _self._next, z: 100, ms: '0s', _y: (parseInt(_self.diff * 0.4)+_self.h)+'px'});

					// 获取数据并插入
					if (!_self.flag) {
						_self.flag = true;
						
						(_self.dataId == _self.dataLen - 1) ? _self.dataId = 0 : _self.dataId++;
						// 插入数据
						_self.addElementCon(_self.dataId, _self._next, null);
					}
				}
			});
		},
		touchEnd: function() {
			var _self = this,
				prev, next;
			_self.touch.on("touchend", function(e) {
				if (_self.diff > 0) {	// 向下滑动
					// 滑动距离大于120，则切换到上一个
					if (_self.diff > 120) {
						_self.setTouchAni({ i: _self.active, z: 100, _y: _self.h+"px" });
						// 上一个
						_self.setTouchAni({ i: _self._prev, z: 90});
						// 当前选项切换
						_self.active = _self._prev;
						// 设置动画
						_self.box.eq(_self.active).find('.'+_self.el).addClass(_self.ani);
					} else {
						// 滑动距离过小，回到原位
						_self.setTouchAni({ i: _self.active, z: 100});
						_self.setTouchAni({ i: _self._prev, s: 0.8, z: 90});
					}

				} else if (_self.diff < 0) {	// 向上滑动
					// 滑动距离大于120，则切换到下一个
					if (_self.diff < -120) {
						_self.setTouchAni({ i: _self.active, s: 0.8, z: 90});
						_self.setTouchAni({ i: _self._next, z: 100});
						
						_self.active = _self._next;

						// 设置动画
						_self.box.eq(_self.active).find('.'+_self.el).addClass(_self.ani);

					} else {	// 距离过小，回到原位
						_self.setTouchAni({ i: _self.active, z: 90});
						_self.setTouchAni({ i: _self._next, z: 100, _y: _self.h+'px' });
					}  
				}
			});
		},
		// 窗口发送改变时
		windowChange: function() {
			var _self = this;
			$(window).resize(function() {
				// 设置高度
				_self.h = $(this).height();
			});
		},
		// 添加元素内容
		addElementCon: function(listInd, i, ani) {
			var data = this.dataList[listInd],
				strHTML;
			if (data.html) {	// 检测是否有数据
				strHTML = '<section id="'+data.id+'" class="'+this.el+' '+data.id+'">'+data.html+'</section>';
				// 插入内容
				this.box.eq(i).html(strHTML);
				// 如果是首屏，则添加显示动画类
				if (ani !== null) {
					this.box.eq(i).find('.'+this.el).addClass(ani);
				}
			}
		},
		// 初始化
		init: function(obj) {
			this.setBoxZIndex(0);	// 设置显示顺序
			this.touchStart();		// 触摸开始
			this.touchMove();		// 触摸移动
			this.touchEnd();		// 触摸结束
			this.windowChange();	// 窗口发生改变
			// 添加元素内容
			this.addElementCon(this.dataId, this.active, this.ani);
		}
	};

	// 文本内容
	var page_1 = {
		id: 'page_1',
		html : '<header>\
					<img src="./img/pic-txt-01.png" alt="天黑了，火在跳，我看着好无聊" />\
				</header>\
				<div class="arrow"></div>'
	}
	var page_2 = {
		id : 'page_2',
		html : '<header>\
					<img src="./img/pic-txt-02.png" alt="灯亮了，今天还和昨天一样" />\
				</header>\
				<div class="arrow"></div>'
	}
	var page_3 = {
		id : 'page_3',
		html : '<header>\
					<img src="./img/pic-txt-03.png" alt="我不要这样的生活" />\
				</header>\
				<div class="arrow"></div>'
	}
	var page_4 = {
		id : 'page_4',
		html : '<header>\
					<img src="./img/pic-txt-04.png" alt="出去走走吧，方向？不重要，出发就好" />\
				</header>\
				<div class="arrow"></div>'
	}
	var page_5 = {
		id : 'page_5',
		html : '<header>\
					<img src="./img/pic-txt-05.png" alt="世界" />\
				</header>\
				<div class="arrow"></div>'
	}
	var page_6 = {
		id : 'page_6',
		html : '<header>\
					<img src="./img/pic-txt-06.png" alt="比想象的还要大" />\
				</header>\
				<div class="arrow"></div>'
	}

	// 实例化
	new TouchSlider({
		touch: $(".main"),
		box: $(".box"),
		el: 'page',
		ani: 'show',
		dataList: [page_1, page_2, page_3, page_4, page_5, page_6] 		// 数据列表
	}).init();


})($, window);