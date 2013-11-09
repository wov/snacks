var adminModel = require('../models/admin');
var info = {};

exports.index = function(req, res){
    // res.send('this is appmanage');
    // res.render('appmanager');
    // res.send(req.body);
    info = req.body;

}

exports.addAppInfo = function (req, res) {

    var appInfo = {"name":"new app"};
    adminModel.addInfo(appInfo);

}
