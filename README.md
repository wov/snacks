## Install Guide

requirement:

* python >2.7 
* setuptools
* SQLAlchemy
**	sudo easy_install Flask-SQLAlchemy 
* MySQL-Python
**	sudo easy_install MySQL-python

steps:

* install tools above
* python server.py

nearly ok! What ? can't install tools above, ASK GOOGLE!

tips:
	
	You can reset your database by http://hostname/resetdb , this command can create whole database for you.
	attention: before you can start init database, please make sure you have config your database info, use your root role of mysql,

<code>
	create database snacks;
	grant all privileges on snacks.* to 'snacks'@'%' identified by 'snacks';
</code>

## Table Struct Design
	; grant all privileges on snacks.* to 'snacks'@'%' identified by 'snacks';
	; 


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
		`url` varchar(50) not null comment '应用的url',
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
		primary key `id`(`id`)
		) engine=innodb charset=utf8;

## Api Documents

* 获取应用列表
	${hostname}/getApp
	params:
		cid : category_id

## Phase 1 story

  * 用户可以方便看到自己选择的站点，打开，删除
  * 用户可以看到不同的分类站点，选择添加到自己的主页
  * 我们可以查看到用户的交互数据
  * 我们可以有一个后台上传精致的ICON和站点链接
  * 让用户离线也可以使用
  * 引导用户把我们添加到桌面

