from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path


db=SQLAlchemy()

def create_app():
    app=Flask(__name__)
    app.config['SECRET_KEY']='shravanshravanshravan'
    app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///sample.db'
    db.init_app(app)

    from .views import view
    from .auth import auth

    app.register_blueprint(view)
    app.register_blueprint(auth)

    from .models import User,Note,MarketValue
    create_db(app)
    return app


def create_db(app):
    if not path.exists('project/'+ 'sample.db'):
        db.create_all(app=app)
        print('db made successfully')
