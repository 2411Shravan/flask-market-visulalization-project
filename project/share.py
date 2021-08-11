from flask import Flask
from flask import Blueprint
from flask import redirect
from flask import render_template
from flask_login import login_required
from flask_login import current_user
from pprint import pprint
import requests


share_market = Blueprint('share_market', __name__)

@share_market.route('/shared')
@login_required
def shares():
    # url = 'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c2vgio2ad3i9mrpv9i2g'
    # r = requests.get(url)
    # data = r.json()

    # pprint(data)
    
    return render_template('/share/crc.html',user=current_user)
