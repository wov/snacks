document.addEventListener('DOMContentLoaded',function(){
	var doc = document; 
	document.addEventListener('touchstart',function(){});

	var Event = 'ontouchstart' in window ? 'touchend' : 'click';

	var _home = doc.querySelector('article.home');
	var _market = doc.querySelector('article.market');
	var _select = doc.querySelector('article.market .select');
	var _lists_ul = doc.querySelector('article.market ul');

	var _adds = doc.querySelectorAll('.add');
	for(var n=0; n < _adds.length;n++ ){
		var _add = _adds[n];
		_add.addEventListener(Event,function(e){
			e.stopPropagation();
			_home.classList.add('hide');
		});
	}

	var _backs = doc.querySelectorAll('.back');
	for(var n=0; n < _backs.length;n++ ){
		var _back = _backs[n];
		_back.addEventListener(Event,function(e){
			e.stopPropagation();
			_home.classList.remove('hide');
			_select.blur();
		});
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
							'<div class="img"></div>' + 
							'<div class="desc">'+el.description+'</div>' + 
							'<div class="add2home">添加应用</div>' + 
						'</li>';
			});
			_lists_ul.innerHTML = html;
		});
	}

	getApp();

	var showTips = function(){
		var _tip = document.createElement('div');
		_tip.className = 'tip';
		_tip.innerHTML = '点击这里添加应用';
		_home.appendChild(_tip);
	}

	var myApps = localStorage.getItem('myApps');
	if(!myApps){
		showTips();
	}

	_select.addEventListener('change',function(){
		var option = {};
		option.category_id = this.value;
		getApp(option);
	});




},false);
