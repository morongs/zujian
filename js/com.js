!function(e,t,a){function n(e){this.url=e.url,this.el=e.el,this.box=e.box,this.boxMain=e.boxMain,this.close=e.close,this.jsonData={},this.dataArr=[],this.delay=e.delay}function o(e){this.nav=e.nav,this.bg=e.bg,this.active=e.active,this._data=e._data,this.list=e.list,this.search=e.search,this.bgTop=parseInt(this.nav.offsetTop),this.delay=e.delay}function l(a,n,o){var i,l,s="";for(i=0,l=n.length;l>i;i++){var r=n[i];s+='<li data-type="'+r.type+'">\r\n				<img src="./images/pixel.gif" data-src="'+r.img+'" alt="'+r.name+'" />\r\n				<h3>'+r.name+'</h3>\r\n				<p><a class="pack-icon down" href="'+r.down+'" target="_blank" title="下载组件"></a>\r\n				<a class="pack-icon demo" href="'+r.demo+'" target="_blank" title="查看Demo"></a>\r\n				<span>'+r.time+"</span>\r\n			</p></li>"}a.innerHTML=s,!function(){function n(a){for(g=parseInt(t.documentElement.scrollTop||t.body.scrollTop),l=u;m>l;l++)s=d[l],s&&(p&&(y.push(s.getAttribute("data-src")),s.removeAttribute("data-src")),r=s.getBoundingClientRect().top,c+g>r+g&&(u=l+1,s.setAttribute("src",y[l]),function(e){mokylin.addHandler(e,"load",function(){e.style.opacity=1})}(s),l==m-1&&(mokylin.removeHandler(e,"scroll",a),clearTimeout(i))));p=!1}var i,l,s,r,c=parseInt(t.documentElement.clientHeight||t.body.clientHeight),d=a.getElementsByTagName("img"),m=d.length,y=[],u=0,g=0,p=!0;n(),mokylin.addHandler(e,"scroll",function(){var e=arguments.callee;i=setTimeout(function(){n(e)},o)}),mokylin.addHandler(e,"resize",function(){c=parseInt(t.documentElement.clientHeight||t.body.clientHeight),n()})}()}function s(e){this.el=e.el,this.delay=e.delay}n.prototype={constructor:n,getData:function(){var e=this,t=mokylin.createXHR();t.onreadystatechange=function(){4==t.readyState&&(t.status>=200&&t.status<300||304==t.status)&&(e.jsonData=JSON.parse(t.responseText),e.setData())},t.open("GET",e.url,!1),t.send()},setData:function(){var e,t,a,n,o,i,s=this;for(a in s.jsonData)if(o=s.jsonData[a],"object"==typeof o&&o instanceof Object)for(n in o)for(i=o[n],e=0,t=i.length;t>e;e++)s.dataArr.push(i[e]);l(s.el,s.dataArr,s.delay)},showInfo:function(){var e=this;mokylin.addHandler(e.el,"click",function(t){var a=mokylin.getEvent(t),n=mokylin.getTarget(a),o="li"==n.parentNode.nodeName.toLowerCase()?n.parentNode:"li"==n.nodeName.toLowerCase()?n:null;if(o){var i,l,s,r=o.getAttribute("data-type"),c=!1;for(i=0,l=e.dataArr.length;l>i;i++)if(e.dataArr[i].type==r){s=e.dataArr[i],c=!0;break}if(c){var d=e.boxMain.getElementsByTagName("img")[0],m=e.boxMain.getElementsByTagName("h3")[0],y=e.boxMain.getElementsByTagName("p")[0],u=e.boxMain.getElementsByTagName("a")[0],g=e.boxMain.getElementsByTagName("a")[1];d.src=s.img,m.innerHTML=s.name,y.innerHTML="功能说明："+s.desc,g.href=s.down,u.href=s.demo,e.box.style.display=e.boxMain.style.display="block"}}}),mokylin.addHandler(e.close,"click",function(t){e.box.style.display=e.boxMain.style.display="none"})},getDataArr:function(){return this.dataArr},init:function(){var e=this;e.getData(),e.showInfo()}},o.prototype={constructor:o,elementLeave:function(){var e=this;mokylin.addHandler(e.nav,"mouseleave",function(t){var a,n,o=e.nav.getElementsByTagName("a"),i=o.length;for(a=0;i>a;a++)(o[a].className==e.active||o[a].getAttribute("class")==e.active)&&(n=parseInt(o[a].offsetTop),e.bg.style.top=n+e.bgTop+"px")})},elementOver:function(){var e=this;mokylin.addHandler(e.nav,"mouseover",function(t){var a,n=mokylin.getEvent(t),o=mokylin.getTarget(n);"a"==o.nodeName.toLowerCase()&&(a=parseInt(o.offsetTop),e.bg.style.top=a+e.bgTop+"px")})},elementClick:function(){var e=this;mokylin.addHandler(e.nav,"click",function(t){var a=mokylin.getEvent(t),n=mokylin.getTarget(a);if(mokylin.preventDefault(a),"a"==n.nodeName.toLowerCase()){var o,i,s,r,c=e.nav.getElementsByTagName("a"),d=[];if(mokylin.removeAllClass(c,e.active),n.className=e.active,o=n.getAttribute("data-type"),"all"==o)d=e._data;else for(i=new RegExp(o),s=0,r=e._data.length;r>s;s++)i.test(e._data[s].type)&&d.push(e._data[s]);l(e.list,d,e.delay)}})},searchFocus:function(){var e=this;mokylin.addHandler(e.search,"keypress",function(){var t,a,n=mokylin.getEvent(event),o=n.keyCode||n.which||n.charCode,s=e.search.getElementsByTagName("input")[0],r=[];if(13==o){for(mokylin.preventDefault(n),t=s.value,a=new RegExp(t,"i"),i=0,len=e._data.length;i<len;i++)a.test(e._data[i].name)&&r.push(e._data[i]);l(e.list,r,e.delay)}})},init:function(){var e=this;e.elementOver(),e.elementLeave(),e.elementClick(),e.searchFocus()}},s.prototype={constructor:s,gotoTopFun:function(){function a(){e.scrollBy(0,-20),n=setTimeout(function(){a()},5),0===t.body.scrollTop&&clearTimeout(n)}var n;mokylin.addHandler(this.el,"click",a)},scrollLocation:function(){function a(){i=parseInt(t.documentElement.scrollTop||t.body.scrollTop),clearTimeout(n),i>=100?(o.el.style.display="block",n=setTimeout(function(){o.el.style.opacity=1},o.delay)):(o.el.style.opacity=0,n=setTimeout(function(){o.el.style.display="none"},o.delay))}var n,o=this,i=0;mokylin.addHandler(e,"scroll",a)},init:function(){this.gotoTopFun(),this.scrollLocation()}},e.GetJsonData=n,e.NavMouseEvent=o,e.GotoTop=s}(window,document);var getData=new GetJsonData({url:"data.json",el:mokylin.$$("package"),box:mokylin.$$("box"),boxMain:mokylin.$$("boxMain"),close:mokylin.$$("boxClose"),delay:200});getData.init();var nav=new NavMouseEvent({nav:mokylin.$$("nav"),bg:mokylin.$$("navBg"),list:mokylin.$$("package"),search:mokylin.$$("search"),active:"on",delay:200,_data:getData.getDataArr()}).init(),gotoTop=new GotoTop({el:mokylin.$$("gotoTop"),delay:100}).init();