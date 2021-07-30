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


@crypto_curr.route('/crypto/intraday/five-minutes-delay/')
@login_required
def intradayData():
    return render_template('intraday.html',user=current_user)


@crypto_curr.route('/crypto/country-codes/')
@login_required
def countrycodes():
    return render_template('countrycode.html',user=current_user)


@crypto_curr.route('/crypto/crypto-codes/')
@login_required
def cryptocodes():
    return render_template('cryptocode.html',user=current_user)


