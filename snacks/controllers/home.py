from snacks import app
from flask import render_template

@app.route("/")
def index():
	return render_template('home.html')

@app.route("/users")
def users():
	return 'this is users'

@app.route("/appManage")
def appManageIndex():
	return 'this is appManageIndex'

@app.route("/addAppInfo")
def addAppInfo():
	return 'this is addAppInfo'

@app.route("/getApp")
def getApp():
	return 'this is getApp'

@app.route("/manifest")
def showManifest():
	return 'this is show manifest'