from flask import Flask 
from flask import redirect
from flask import render_template
from flask import Blueprint
from flask_login import login_required
from flask_login import current_user

crypto_curr = Blueprint('crypto_curr',__name__)


@crypto_curr.route('/crypto/exchanges-uuid/')
@login_required
def crypto():
    return render_template('exchange.html',user=current_user)

@crypto_curr.route('/crypto/globalstats/')
@login_required
def globalstats():
    return render_template('globalstats.html',user=current_user)

@crypto_curr.route('/crypto/market/')
@login_required
def cryptomarket():
    return render_template('cryptomarket.html',user=current_user)

