from flask import Flask
from flask import Blueprint
from flask import render_template
from flask import redirect
from flask import flash
from flask_login import current_user
from flask_login import login_required
from flask import request
from pprint import pprint
import requests

fundamentals = Blueprint('fundamentals',__name__)


@fundamentals.route('/fundamentals/stock-symbols/')
@login_required
def stock_symbols():
    return render_template('fundamentals/stock_symbol.html',user=current_user)

@fundamentals.route('/fundamentals/all-stocks/')
@login_required
def all_stocks():
    return render_template('fundamentals/allstocks.html',user=current_user)

@fundamentals.route('/fundamentals/company-profile/',methods=['GET','POST'])
@login_required
def profile():

    if request.method == 'POST':
        comp_name = request.form['company']
        url = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol='+comp_name+'&apikey=WH75LQJ4BD7S15TO'
        r = requests.get(url)
        data = r.json()
        if data:

            name=data['Name']
            symbol=data['Symbol']
            sector=data['Sector']
            industry=data['Industry']
            country=data['Country']
            asset=data['AssetType']
            address=data['Address']
            comp=data['Description']
            exchange=data['Exchange']
            return render_template('fundamentals/company_profile.html',
                    user=current_user,comp=comp,name=name,symbol=symbol,sector=sector,
                    industry=industry,country=country,asset=asset,address=address,exchange=exchange,data=data)
        else:
            message='No data exists with our data providers for such given code input'
            return render_template('fundamentals/company_profile.html',
                    user=current_user,message=message)
        # pprint(data)
        
        
    return render_template('fundamentals/company_profile.html',user=current_user)