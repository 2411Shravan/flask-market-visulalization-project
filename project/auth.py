from flask import Flask
from flask import Blueprint

auth=Blueprint('auth',__name__)

@auth.route('/signup')
def signup():
    return "You are now in signup route"
