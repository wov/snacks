## Table Struct Design
	; grant all privileges on snacks.* to 'snacks'@'%' identified by 'snacks';
	; 192.168.1.101


* category app分类
* applist  app列表
* imagesource 图片资源

	create table `category` (
		`id` int not null auto_increment comment '主键',
		`name` varchar(50) not null  comment '名称',
		`create_time` int not null comment '创建时间',
		primary key `id`(`id`)
		) engine=innodb charset=utf8;

	create table `applist` (
		`id` int not null auto_increment comment '主键',
		`name` varchar(50) not null comment '应用名称',
		`url` varchar(50) not null commment '应用的url',
		`category_id` int not null comment '应用类别id',
		`icon_id` int not null comment 'icon图标资源ID',
		`snapshot_id` int not null comment '屏幕截图ID',
		`description` varchar(200) not null comment '描述',
		`create_time` int not null comment '创建时间',
		`update_time` int not null comment '更新时间',
		primary key `id`(`id`),
		key `category_id`(`category_id`)
		) engine=innodb charset=utf8;

	create table `imagesource` (
		`id` int not null auto_increment comment '主键',
		`file_name` varchar(200) not null comment '图片资源名称',
		`image_path` varchar(200) not null comment '图片资源路径',
		`create_time` int not null comment '创建时间',
		`update_time` int not null comment '更新时间',
		`type` tinyint not null comment '类型',
		primary_key `id`(`id`)
		) engine=innodb charset=utf8;

## Api Documents

* 获取应用列表
	${hostname}/getApp
	params:
		cid : category_id


