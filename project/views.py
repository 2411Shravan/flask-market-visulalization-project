from flask import Flask
from flask import redirect
from flask import render_template
from flask import Blueprint
from flask_login import login_required
from flask_login import current_user

view=Blueprint('view',__name__)


@view.route('/')
def home():
    return render_template('home.html',user=current_user)

@view.route('/about')
def about():
    return 'about us'

@view.route('/contact')
@login_required
def contact():
    return render_template('contact.html',user=current_user)


@view.route('/share-market')
@login_required
def ShareMarket():
    return render_template('shares.html',user=current_user)


@view.route('/crypto')
@login_required
def Crypto():
    return render_template('crypto.html',user=current_user)



@view.route('/mutualfunds')
@login_required
def mutualfunds():
    return render_template('mutual.html',user=current_user)


@view.route('/currencies')
@login_required
def currencies():
    return render_template('currency.html',user=current_user)

@view.route('/user-profile')
@login_required
def userprofile():
    return render_template('userprofile.html',user=current_user)
