from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship,backref
from snacks.database import Base

class AppList(Base):
	__tablename__ = 'applist'
	id = Column(Integer, primary_key = True)
	name = Column(String(50),unique = True)
	url = Column(String(50))
	category_id = Column(Integer)

	icon_id = Column(Integer)
	snapshot_id = Column(Integer)
	description = Column(String(1000))
	create_time = Column(Integer)
	update_time = Column(Integer)

	def __init__(self,name,url,category_id,icon_id,snapshot_id,description,create_time,update_time):
		self.name = name
		self.url = url
		self.category_id = category_id
		self.icon_id = icon_id
		self.snapshot_id = snapshot_id
		self.description = description
		self.create_time = create_time
		self.update_time = update_time

	def __repr__(self):
		return '<AppName: %r>' % self.name

class Category(Base):
	__tablename__ = 'category'
	id = Column(Integer, primary_key=True)
	name = Column(String(50))
	create_time = Column(Integer)
	update_time = Column(Integer)

	def __init__(self,name,create_time,update_time):
		self.name = name
		self.create_time = create_time
		self.update_time = update_time

	def __repr__(self):
		return '<Category Name: %r>' % self.name



class ImageSource(Base):

	__tablename__ = 'imagesource'
	id = Column(Integer, primary_key=True)
	file_name = Column(String(200))
	image_path = Column(String(200))
	type = Column(String(10))
	create_time = Column(Integer)
	update_time = Column(Integer)

	def __init__(self,file_name,image_path,type,create_time,update_time):
		self.file_name = file_name
		self.image_path = image_path
		self.type = type
		self.create_time = create_time
		self.update_time = update_time

	def __repr__(self):
		return '<file name: %r>' % self.file_name