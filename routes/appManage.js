var adminModel = require('../models/admin');
var fs = require('fs');

exports.index = function(req, res){
    res.render("appmanager");
}

exports.addAppInfo = function (req, res) {
	var info = {};
    info = req.body;
    info.icon_id = 0;
    info.snapshot_id = 0;
    if (info.url.match(/^http.*/g) == null) {
    	info.url = "http://"+info.url;
    }
    info.create_time = info.update_time = Date.parse(new Date())/1000;
    adminModel.addInfo(info, function(err, rows){
    	var appId = rows.insertId;
    	icon  = {};
    	icon.image_path = req.files.icon.path;
    	icon.file_name = req.files.icon.name;
    	icon.create_time=icon.update_time=Date.parse(new Date())/1000;
    	icon.type = 1;
    	adminModel.addImageSource(1, icon, function(err, rows){
    		console.log('icon saved successfully');
    		adminModel.updateAppInfoById(appId,{key:'icon_id',value:rows.insertId},function(){
    			console.log('icon_id modified successfully!');
    		});
    	});

    	snapshot  = {};
    	snapshot.image_path = req.files.snapshot.path;
    	snapshot.file_name = req.files.snapshot.name;
    	snapshot.create_time = snapshot.update_time = Date.parse(new Date())/1000;
    	snapshot.type = 2;
    	adminModel.addImageSource(2, snapshot, function(err, rows){
    		console.log('snapshot saved successfully');
			adminModel.updateAppInfoById(appId,{key:'snapshot_id',value:rows.insertId},function(){
    			console.log('snapshot_id modified successfully!');
    		});
    	});
		res.redirect("/appManage");
	});
}

exports.getAppList = function (req, res) {
	category_id = req.query.cid;
	console.log("cid:"+category_id);
	result = adminModel.getAppList(category_id,function(err, rows){
	res.set({
	  'Content-Type': 'text/plain; charset=utf-8',
	})
		var idList = [];
		for(var i=0;i<rows.length;i++) {
			idList.push(rows[i].icon_id);
			idList.push(rows[i].snapshot_id);
		}
		console.log("++++++");
		console.log(idList);
		adminModel.getImageSourceByIds(idList,function(err,imageRows){
			var listResult = [];
			for(var k=0;k<rows.length;k++) {
				var resultItem = rows[k];
				for (var j=0; j< imageRows.length; j++) {
					if(imageRows[j].id == resultItem.icon_id) {
						resultItem.icon_url = "http://"+req.host+imageRows[j].image_path.replace('public','');
					}
					if(imageRows[j].id == resultItem.snapshot_id) {
						resultItem.snapshot_url = "http://"+req.host+imageRows[j].image_path.replace('public','');
					}
				}
				listResult.push(resultItem);
			}
			console.log(listResult);
			res.end(JSON.stringify(listResult));
		});
		
	});

}

exports.showManifest = function (req, res) {
	res.setHeader('Content-Type', 'text/cache-manifest');
	var str = "CACHE MANIFEST\n";
	str += '#version 1\n';
	str += "/stylesheets/style.css\n";
	str += "/script/touch.js\n";
	str += "/script/index.js\n";
	res.end(str);
}



