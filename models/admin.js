var mysql = require('mysql');

function getConnection() {
	return mysql.createConnection({
	host: '192.168.1.101', 
	user: 'snacks',
	password: 'snacks',
	database: 'snacks',
});

}

function addInfo(appInfo) {
	connection = getConnection();
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

function getAppList(category, callback) {
	var connection = getConnection();
	connection.connect();
	var query = "select * from applist";
	var result = [];
	if (undefined != category && category != 0) {
		query = query +" where category_id=" + category +";";
	}
	console.log("getAppList query is :"+query);
	connection.query(query,function(err, rows, fileds){
		if (err) {throw err;};
		connection.end()

		return callback(err,rows);
	});

}

exports.addInfo = addInfo;
exports.getAppList = getAppList;