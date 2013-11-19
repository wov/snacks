from snacks import app
from flask import render_template,request
from snacks.database import db_session,reset_db
from snacks.models import AppList,Category,ImageSource
import json,time
from werkzeug import secure_filename
import os
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLLOWED_EXTENTIONS'] = set(['png','jpg','jpeg','gif'])
app.config['UPLOAD_IMAGE_FOLDER'] = os.path.abspath('.')+"/snacks/static/assets/appImages/"


@app.route("/")
def index():
	return render_template('home.html')

@app.route("/users")
def users():
	return 'this is users'

@app.route("/appManage")
def appManageIndex():
	return render_template('appManager.html')

@app.route("/addAppInfo",methods=['POST'])
def addAppInfo():
	if request.method == 'POST':
		snapshot_image = request.files['snapshot']
		icon_image = request.files['icon']
		if snapshot_image and icon_image :
			snapshot_image_name = secure_filename(snapshot_image.filename)
			icon_image_name = secure_filename(icon_image.filename)
			print snapshot_image.save(os.path.join(app.config['UPLOAD_IMAGE_FOLDER'],snapshot_image_name))
			print icon_image.save(os.path.join(app.config['UPLOAD_IMAGE_FOLDER'],icon_image_name))
			currentTime = int(time.time())
			icon = ImageSource(icon_image.filename,icon_image_name,1,currentTime,currentTime)
			snapshot = ImageSource(snapshot_image.filename,snapshot_image_name,2,currentTime,currentTime)
			db_session.add(icon)
			db_session.add(snapshot)
			db_session.commit()
			webApp = AppList(request.form['name'],request.form['url'],request.form['category_id'],\
					icon.id,snapshot.id,request.form['description'],currentTime,currentTime)
			db_session.add(webApp)
			db_session.commit()		
			print "<webApp name: %r>" % webApp.name
	return 'this is addAppInfo'

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.',1)[1] in app.config['ALLOWED_EXTENTIONS']

@app.route("/getApp")
def getApp():
	cid = request.args.get('cid',0)
	if cid == 0:
		appList = db_session.query(AppList).all()
	else:
		appList = db_session.query(AppList).filter('category_id=:id').params(id=cid).all()
	resultList = []
	if len(appList) > 0:
		
		for app in appList:
			result = {}
			result['id'] = app.id
			result['category_id'] = app.category_id
			result['name'] = app.name
			result['update_time'] = app.update_time
			result['create_time'] = app.create_time
			result['url'] = app.url
			result['description'] = app.description
			snapshot_item = db_session.query(ImageSource).filter('id=:id').params(id=app.snapshot_id).first()
			result['snapshot_url'] = '/static/assets/appImages/'+snapshot_item.image_path if snapshot_item is not None else ''
			icon_item = db_session.query(ImageSource).filter('id=:id').params(id=app.icon_id).first()
			result['icon_url'] = '/static/assets/appImages/'+icon_item.image_path if icon_item is not None else ''

			resultList.append(result)
		return json.dumps(resultList)
	else:
		return json.dumps(resultList)

@app.route("/manifest")
def showManifest():
	from flask import Response
	str =  '''
	CACHE MANIFEST\n
	#version 4 \n
	/static/stylesheet/style.css \n
	/static/script/touch.js \n
	/static/script/index.js \n
	'''
	return Response(str, mimetype='text/cache-manifest')

@app.route("/resetdb")
def resetdatabase():
	reset_db()
	return ''