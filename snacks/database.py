from sqlalchemy import  create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('mysql://snacks:snacks@localhost/snacks',convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
										autoflush=False,
										bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
	import snacks.models
	Base.metadata.create_all(engine)

def reset_db():
	import snacks.models
	Base.metadata.drop_all(engine)
	Base.metadata.create_all(engine)

def sqlalchemy_json(self,request):
	obj_dict = self.__dict__
	return dict((key,obj_dict[key]) for key in obj_dict if not key.startswith("_"))

Base.__json__ = sqlalchemy_json