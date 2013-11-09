var mysql = require('mysql');

function getConnection() {
	return mysql.createConnection({
	host: '192.168.1.101', 
	user: 'snacks',
	password: 'snacks',
	database: 'snacks',
});

}

function addInfo(appInfo, callback) {
	connection = getConnection();
	connection.connect();
	console.log("Add AppInfo:");
	console.log(appInfo);
	query = "insert into applist(name,category_id,icon_id,snapshot_id,description,create_time,update_time,url) values( \
		'" + appInfo.name + "', \
		'" + appInfo.category_id + "', \
		" + appInfo.icon_id + ", \
		" + appInfo.snapshot_id + ", \
		'" + appInfo.description + "', \
		" + appInfo.create_time + ", \
		" + appInfo.update_time + ", \
		'" + appInfo.url + "' \
		);";
	console.log(query);
	connection.query(query, function (err, rows, fields) {
		if (err) { throw err; };
		console.log("This query is affected ");
		callback && callback.apply(null,[err, rows])
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

function updateAppInfoById(id, dataPair, callback) {
	var connection = getConnection();
	connection.connect();
	var query = "update applist set ??=? where id=?";
	connection.query(query,[dataPair.key, dataPair.value, id], function (err, rows) {
		if (err) {throw err;}
		connection.end();
		return callback(err,rows);
	});

}

function addImageSource(type, imageInfo, callback) {
	var connection = getConnection();
	connection.connect();
	var query = "insert into imagesource (file_name,image_path,create_time,update_time,type) \
	 	values (?,?,?,?,?);";
	 console.log(query);
	 console.log("imageInfo:");
	 console.log(imageInfo);
	 connection.query(query,[
	 						imageInfo.file_name,
	 						imageInfo.image_path,
	 						imageInfo.create_time,
	 						imageInfo.update_time,
	 						imageInfo.type
	 					],function(err, rows, fields){
	 						if (err) {throw err;};
	 						connection.end();
	 						callback && callback.apply(null,[err,rows]);		
	 					});

}

function getImageSourceById(id, callback) {
	var connection = getConnection();
	connection.connect();
	var query = "select * from imagesource where id=?";
	connection.query(query,[id],function (err,rows) {
		if(err) {throw err;}
		connection.end();
		callback && callback.apply(null,[err,rows]);
	});

}

exports.addInfo = addInfo;
exports.getAppList = getAppList;
exports.addImageSource = addImageSource;
exports.updateAppInfoById = updateAppInfoById;
exports.getImageSourceById = getImageSourceById;