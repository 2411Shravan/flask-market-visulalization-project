from flask import Flask
from flask import redirect
from flask import render_template
from flask import Blueprint

view=Blueprint('view',__name__)


@view.route('/')
def index():
    return "Hello world"
