from flask import Flask


def create_app():
    app=Flask(__name__)
    app.config['SECRET_KEY']='shravanshravanshravan'

    from .views import view
    from .auth import auth

    app.register_blueprint(view)
    app.register_blueprint(auth)

    return app