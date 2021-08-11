from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db=SQLAlchemy()

def create_app():
    app=Flask(__name__)
    app.config['SECRET_KEY']='shravanshravanshravan'
    app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///sample.db'
    db.init_app(app)

    login_manager=LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)


    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    from .views import view
    from .auth import auth
    from .crypto import crypto_curr
    from .share import share_market
    from .fundamentals import fundamentals

    app.register_blueprint(view)
    app.register_blueprint(auth)
    app.register_blueprint(crypto_curr)
    app.register_blueprint(share_market)
    app.register_blueprint(fundamentals)

    from .models import User,Note,MarketValue
    create_db(app)
    return app


def create_db(app):
    if not path.exists('project/'+ 'sample.db'):
        db.create_all(app=app)
        print('db made successfully')
