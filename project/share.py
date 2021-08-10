from flask import Flask
from flask import Blueprint
from flask import redirect
from flask import render_template
from flask_login import login_required
from flask_login import current_user
import requests


share_market = Blueprint('share_market', __name__)

@share_market.route('/shared')
@login_required
def shares():
    return render_template('/share/crc.html',user=current_user)
