(function(window, undefined) {

	var load = morong.$$('loading');
	var box1 = morong.$$('box1');
	var imgPath = './style/image/';
	var loadingPage = (function () {
	    var imgSources = ['arrow.png'];
	    for (var i = 0; i < imgSources.length; i++) {
	        imgSources[i] = (imgPath + imgSources[i]);
	    };
	    var loadImage = function (path, callback) {
	        var img = new Image();
	        img.onload = function () {
	            img.onload = null;
	            callback(path);
	        }
	        img.src = path;
	    }

	    var imgLoader = function (imgs, callback) {
	        var len = imgs.length, i = 0;
	        while (imgs.length) {
	            loadImage(imgs.shift(), function (path) {
	                callback(path, ++i, len);
	            })
	        }
	    }
	    var percent = 0;
	    imgLoader(imgSources, function (path, curNum, total) {
	        percent = curNum / total;
	        if (percent == 1) {
               	load.className += " load-hide";
	            setTimeout(function () {
					load.style.display = "none";
	                box1.className += " on";
	            }, 500);
	        }
	    });
	})();


})(window);