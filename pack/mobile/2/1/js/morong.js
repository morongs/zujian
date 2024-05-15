/*
* 初始化全局函数
*/
var $box = $(".box_bg"),
	$txt = $(".box_txt");
	$close = $(".close"),
	$wei = $(".icon_weixin"),
	$shareWei = $(".weixin_share"),
	$btn = $(".share_btn");
// 初始模块功能
window.morong = function() {
	return {
		$$: function(id) {
			return (!id) ? null : document.getElementById(id);
		},
		// 分享配置信息
		infoData: function() {
			return {
				title: "政元，新年祝福",
				desc: "祝电商家人们新春快乐、三阳开泰、生意兴隆！",
				link: "http://www.yingxiaoli.com/services/index.php",
				imgUrl: "http://www.yingxiaoli.com/images/yang-share.jpg"
			}
		},
		showBox: function(txt, time) {
			$box.fadeIn();
			$txt.fadeIn().find("div span").text(txt);
			if (time != 0) {
				setTimeout(function() {
					$box.fadeOut();
					$txt.fadeOut();
				}, time);
			}
		},
		// 判断是苹果或者安卓
		isIos: function(){
			var sUserAgent= navigator.userAgent.toLowerCase(),
				bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
				bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
				return (bIsIpad || bIsIphoneOs);				
		},
		// 获取触摸位置
		getTouchLocation: function(e) {
			e.preventDefault();		// 阻止默认
			return e.touches[0];
		},
		// 获取url参数
		getLocationUrl: function() {
			if (location.search.length > 0) {
				var url = location.search,
					paraString = url.substring(url.indexOf("?")+1, url.length).split("&"),
					urlArr = {};
				// 截取对应字符
				for (var i = 0; i < paraString.length; i++) {
					var j = paraString[i];
					// 设置对应参数
					urlArr[j.substring(0,j.indexOf("="))] = j.substring(j.indexOf("=")+1, j.length);
				}
				return urlArr;	// 返回url参数
			}
		},
		hideBox: function() {
			$box.hide();
			$txt.hide();
			if ($share) $share.hide();
			if ($shareWei) $shareWei.hide();
		},
		init: function() {
			var _self = this;
			$close.on("tap", function() {
				_self.hideBox();
			});
			// 点击微信
			$wei.on("tap", function() {
				$shareWei.show();
			});
			// 点击弹出背景，如果分享提示存在，则关闭
			$box.on("tap", function() {
				if ($shareWei.is(":visible")) {
					$shareWei.hide();
				}
			});
			$btn.on("tap", function() {
				$box.show();
				$txt.show();
			});
		}
	}
}();
morong.init();