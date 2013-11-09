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
    console.log(info);
    var appInfo = {"name":"new app"};
    adminModel.addInfo(appInfo);
	// res.send('this is appmanage');
	// res.render('appmanager');
	// res.send(req.body);

}
