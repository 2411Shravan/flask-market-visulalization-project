from flask import Flask
from flask import redirect
from flask import render_template
from flask import Blueprint

view=Blueprint('view',__name__)


@view.route('/')
def home():
    return render_template('home.html')

@view.route('/about')
def about():
    return 'about us'

@view.route('/contact')
def contact():
    return 'contact us'
