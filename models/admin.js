var mysql = require('mysql');

var connection = mysql.createConnection({
	host: '192.168.1.101', 
	user: 'snacks',
	password: 'snacks',
});


function addInfo(appInfo) {
	connection.connect();
	console.log("Add AppInfo:");
	console.log(appInfo);
	connection.end();
}

exports.addInfo = addInfo;