var mysql = require('mysql');

var connection = mysql.createConnection({
	host: '192.168.1.101', 
	user: 'snacks',
	password: 'snacks',
	database: 'snacks',
});


function addInfo(appInfo) {
	connection.connect();
	console.log("Add AppInfo:");
	console.log(appInfo);
	query = "insert into applist(name,category_id,icon_id,description,create_time,update_time) values( \
		'" + appInfo.name + "', \
		'" + appInfo.category_id + "', \
		" + appInfo.icon_id + ", \
		'" + appInfo.description + "', \
		" + appInfo.create_time + ", \
		" + appInfo.update_time + " \
		);";
	console.log(query);
	connection.query(query, function (err, rows, fields) {
		if (err) { throw err; };
		console.log("This query is affected ");
	});
	connection.end();
}

exports.addInfo = addInfo;