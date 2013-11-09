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
    info.icon_id = 1;
    info.create_time = info.update_time = Date.parse(new Date())/1000;
    adminModel.addInfo(info, function(err, rows){
	    res.send('successful');
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


