(function(window, undefined) {
	// 注意：所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。 
  	// 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
  	// 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html

  	// 微信分享构造函数
  	function WeixinShare(opts) {
  		this.url = opts.url;					// 请求数据URL
  		this.wxTitle = opts.wxTitle;			// 微信分享标题
  		this.wxDesc = opts.wxDesc;				// 微信分享描述
  		this.wxLink = opts.wxLink;				// 微信分享链接
  		this.wxImgUrl = opts.wxImgUrl;			// 微信分享图片URL
  		this.wxType = opts.wxType;				// 分享类型
  		this.wxDetaUrl = opts.wxDetaUrl;		// 分享类型数据链接
  		this.wxApiList = opts.wxApiList;		// 功能参数列表
  	}
  	WeixinShare.prototype = {
  		constructor: WeixinShare,
  		// 配置微信分享
  		setConfig: function() {
  			var _self = this,
  				xhr;
  			// 检测是否支持XMLHttpRequese对象
  			if (window.XMLHttpRequest) {
  				xhr = new XMLHttpRequest();
  			} else {
  				xhr = new ActiveXObject("Microsoft.XMLHTTP");
  			}
  			xhr.onreadystatechange = function() {
  				if (xhr.readyState == 4) {
  					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
  						var data = eval('('+xhr.responseText+')');
  						data.debug = false;
  						// 功能参数列表
  						data.jsApiList = _self.wxApiList;
  						// 注入微信config接口配置
  						wx.config(data);
  						// 启动微信分享
			  			_self.startReady();
  						// console.log(data);
  						//_self.debugInfo("setConfig成功！"+JSON.stringify(data));
  					} else {
  						//_self.debugInfo("setConfig数据调用错误！");
  					}
  				}
  			};
  			xhr.open("GET", _self.url, true);
  			xhr.send();
  		},
  		// 启动微信分享
  		startReady: function() {
  			var _self = this;
  			wx.ready(function() {
  				// 分享到朋友圈
  				wx.onMenuShareTimeline({
					title: _self.wxTitle,			// 分享标题
                    link: _self.wxLink, 			// 分享链接
                    imgUrl: _self.wxImgUrl, 		// 分享图标
                    success: function() {
					},
					cancel: function() {					
					}
  				});
  				// 分享给朋友
				wx.onMenuShareAppMessage({
					title: _self.wxTitle,			// 分享标题
					desc: _self.wxDesc,				// 分享标题
                    link: _self.wxLink, 			// 分享链接
                    imgUrl: _self.wxImgUrl, 		// 分享图标
					type: _self.wxType,
					// 分享类型, music、video或link，不填默认为link
					dataUrl: _self.wxDetaUrl,
					// 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
					},
					cancel: function() {
					}
				});

  			});
  			wx.error(function(res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  				console.log("config验证错误: " + res);
  			});
  		},
  		// debug调试信息
  		debugInfo: function(message) {
  			var debug = document.getElementById("debugInfo");
  			if (debug == null) {
  				debug = document.createElement("div");
  				debug.id = "debugInfo";
  				debug.style.cssText = "position:absolute;top:0;left:0;width:400px;padding:5px;border:1px solid #ccc;background:#dedede;";
  				document.body.appendChild(debug);
  			}
  			debug.innerHTML = message;
  		},
  		init: function() {
  			var _self = this;
  			_self.setConfig();
  		}
  	};

  	var link = location.href;
  	// console.log(link);
  	// 实例化微信分享
  	new WeixinShare({
  		url: "jssdk.php?url=" + link,
  		wxTitle: "测试 - 告诉全世界，我的深圳下雪了",
  		wxDesc: "测试 - 新闻报道：昨日深圳突降大雪，全城骤变白色海洋。",
  		wxImgUrl: "http://img.liveapp.cn/group1/M00/42/59/eccZzlS8ZESAOZmIAACagqkbzaA818.jpg",
  		wxLink: link,
  		wxType: "",
  		wxDetaUrl: "",
  		wxApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']
  	}).init();

})(window);