document.addEventListener('DOMContentLoaded',function(){
	var doc = document; 
	document.addEventListener('touchstart',function(){});

	var Event = 'ontouchstart' in window ? 'touchend' : 'click';

	var _home = doc.querySelector('article.home');
	var _market = doc.querySelector('article.market');
	var _select = doc.querySelector('article.market .select');
	var _content = _home.querySelector('.content');
	var _lists_ul = doc.querySelector('article.market ul');
	var _content_ul = doc.querySelector('article.home ul');

	// 从localStorage 返回已经保存的数组
	var getApps = function(){
		var arr;
		if(!localStorage.getItem('myApps')){
			arr = [];
		}else{
			arr = JSON.parse(localStorage.getItem('myApps'));
		}
		return arr;
	};

	// 将数组保存到localStorage
	var saveApps = function(arr){
        if(Object.prototype.toString.call( arr ) !== '[object Array]'){return false;}
        localStorage.setItem('myApps',JSON.stringify(arr));
	};

	// 添加一个对象到localStorage 
	// TODO : 过滤掉相同id的obj
	var pushApp = function(obj){
		var arr = getApps();
		arr.push(obj);
		saveApps(arr);
	}

	var get = function(url,callback,error,timeout,outtime,contentType){

	    var contentType = contentType || 'application/json';
	    var outtime = outtime || 15000;

	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function(){
	    if(xhr.readyState === 4){
	            if(xhr.status <= 400){
	                callback && callback.apply(null,[xhr.responseText]);
	            }else{
	                error && error.apply(null,[xhr.responseText]);
	            }
	        }
	    };
	    xhr.open('GET',url);
	    xhr.setRequestHeader("Content-type", contentType);
	    xhr.timeout = outtime;
	    xhr.ontimeout = function () { 
	        timeout && timeout.apply(null);
	    }
	    xhr.send(null);
	}

	var getApp = function(option){
		var url = '/getApp';
		var parms = '';
		option = option || {};
		for(var i in option){
			if(!parms){
				parms = '?' + i + '=' + option[i];
			}else{
				parms += '&' + i + '=' + option[i];
			}
		}
		url += parms;
		get(url,function(res){
			var obj = JSON.parse(res);
			var html = '';

			obj.forEach(function(el,index){
				html += '<li>' + 
							'<div class="img" style="background:url(\''+el.icon_url+'\')"></div>' + 
							'<div class="desc">'+el.description+'</div>' + 
							'<div class="add2home" jsdata=\''+JSON.stringify(el)+'\'>添加应用</div>' + 
						'</li>';
			});
			_lists_ul.innerHTML = html;
		});
	}


	var showTips = function(){
		rmTips();
		var _tip = document.createElement('div');
		_tip.className = 'tip';
		_tip.innerHTML = '点击这里添加应用';
		_home.appendChild(_tip);
	}

	var rmTips = function(){
		if(!!doc.querySelector('.tip')){
			var _tip = doc.querySelector('.tip');
			_tip.parentNode.removeChild(_tip);
		}
	}

	var myApps = localStorage.getItem('myApps');
	if(!myApps){
	}

	_select.addEventListener('change',function(){
		var option = {};
		option.cid = this.value;
		getApp(option);
	});


	// 主屏幕上显示 apps
	// @params animaLastest 最新加入的是否显示动画。
	var showMyApps = function(animaLastest){
		var arr = getApps();

		if(arr.length < 1){
			_content_ul.innerHTML = '<li class="add"></li>';
			showTips();
		}else{
			rmTips();
			var html = '';

			// 最新加入的放在最前面
			for(var n=arr.length-1;n>=0;n--){
				var el = arr[n];

				html += '<li jsurl="'+el.url+'" class="'+( (animaLastest && n === arr.length-1) ? 'popout' : '') +'">' +
							'<div class="thumb open" style="background:url(\''+el.icon_url+'\')"></div>' +
							'<div class="title open">'+el.name+'</div>' +
						'</li>';
			}

			html += '<li class="add"></li>';
			_content_ul.innerHTML = html;
			_content.scrollTop = 0;
		}
	}


	iTouch({
		element : doc.body,
		click : function(e){
			var _target = e.target;

			if(_target.classList.contains('add2home')){
				if(!_target.hasAttribute('jsdata')){
					return false;
				}else{
					pushApp(JSON.parse(_target.getAttribute('jsdata')));
					_home.classList.remove('hide');
					// 等动画显示完毕后再添加
					setTimeout(function(){showMyApps(true);},500);
				}
			}

			if(_target.classList.contains('add')){
				_home.classList.add('hide');
			}

			if(_target.classList.contains('back')){
				_home.classList.remove('hide');
				_select.blur();
			}

			if(_target.classList.contains('clear')){
				var r = confirm('是否清空全部应用');
				if(r){
					localStorage.clear();
					showMyApps();
				}
			}

			if(_target.classList.contains('open')){
				var _parent = _target.parentNode;
				if(!_parent.hasAttribute('jsurl')){return;}
				var url = _parent.getAttribute('jsurl');
				_parent.classList.remove('popout');
				_parent.classList.add('opening');

				setTimeout(function(){
					window.open(url,'_blank');
					_parent.classList.remove('opening');
				},500);
			}
		}
	});


	// 初始化 
	var init = (function(){

		// 显示自己的应用
		showMyApps();
		// 从服务器获取全部应用
		getApp();

	})();






},false);
