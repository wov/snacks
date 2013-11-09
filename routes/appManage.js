var adminModel = require('../models/admin');
var fs = require('fs');
var info = {};

exports.index = function(req, res){
    // res.send('this is appmanage');
    // res.render('appmanager');
    // res.send(req.body);
	res.render('appmanager');


}

exports.addAppInfo = function (req, res) {
	console.log('----');
	console.log(req.files);
	console.log('----');

    info = req.body;
    console.log(req.body);
    info.icon_id = 0;
    info.snapshot_id = 0;
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
		res.end(JSON.stringify(rows));
	});

}

exports.showImage = function (req, res) {
	id = req.query.id;
	adminModel.getImageSourceById(id, function(err, rows) {
			console.log(rows);
			var image = {};
			if(rows.length){
				image = rows.pop();
				var imagePath= fs.realpathSync('.')+"/"+image.image_path;
				console.log(imagePath);
				fs.readFile(imagePath,"binary",function(error,file) {
					//res.contentType(image);
					//res.set({'MIME-Type':'image/jpg'});
					//res.type('jpg');
					res.header({'Content-Type':'image/jpg'});
					res.sendfile(file);
				});

			}
			res.end();
	});

}


