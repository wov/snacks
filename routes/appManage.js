var adminModel = require('../models/admin');
var info = {};

exports.index = function(req, res){
    // res.send('this is appmanage');
    // res.render('appmanager');
    // res.send(req.body);
	res.render('appmanager');


}

exports.addAppInfo = function (req, res) {
    info = req.body;
    info.icon_id = 1;
    info.create_time = info.update_time = Date.parse(new Date())/1000;
    adminModel.addInfo(info);
	
}

exports.getAppList = function (req, res) {
	category_id = req.query.cid;
	console.log("cid:"+category_id);
	result = adminModel.getAppList(category_id,function(err, rows){
		res.end(JSON.stringify(rows));
	});

}


