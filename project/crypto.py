from flask import Flask 
from flask import redirect
from flask import render_template
from flask import Blueprint
from flask_login import login_required

crypto_curr = Blueprint('crypto_curr',__name__)


@crypto_curr.route('/user/crypto')
@login_required
def crypto():
    return "<h1>You are now in crypto section</h1>"
