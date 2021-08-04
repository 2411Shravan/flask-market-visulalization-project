from flask import Flask 
from flask import redirect
from flask import render_template
from flask import Blueprint
from flask_login import login_required
from flask_login import current_user
import requests


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





@crypto_curr.route('/crypto/daily/open-close')
@login_required
def openclose():
    return render_template('openclose.html',user=current_user)



@crypto_curr.route('/crypto/coin-history/',methods=['GET','POST'])
@login_required
def history():
    
    
    # num=1
    # url = "https://coinranking1.p.rapidapi.com/coin/"+str(num)+"/history/7d"

    # headers = {
    #     'x-rapidapi-key': "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
    #     'x-rapidapi-host': "coinranking1.p.rapidapi.com"
    #     }

    # response = requests.request("GET", url, headers=headers)

    
    return render_template('coinhistory.html',user=current_user)

@crypto_curr.route('/crypto/allcoins/',methods=['GET','POST'])
@login_required
def allcoins():
    
    
    # num=1
    # url = "https://coinranking1.p.rapidapi.com/coin/"+str(num)+"/history/7d"

    # headers = {
    #     'x-rapidapi-key': "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
    #     'x-rapidapi-host': "coinranking1.p.rapidapi.com"
    #     }

    # response = requests.request("GET", url, headers=headers)

    
    return render_template('coins.html',user=current_user)

    


@crypto_curr.route('/crypto/single-coin/',methods=['GET','POST'])
@login_required
def singlecoin():
    
    
    # num=1
    # url = "https://coinranking1.p.rapidapi.com/coin/"+str(num)+"/history/7d"

    # headers = {
    #     'x-rapidapi-key': "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
    #     'x-rapidapi-host': "coinranking1.p.rapidapi.com"
    #     }

    # response = requests.request("GET", url, headers=headers)

    
    return render_template('singlecoin.html',user=current_user)





@crypto_curr.route('/crypto/grouped-data',methods=['GET','POST'])
@login_required
def groupedData():
    
    return render_template('grouped.html',user=current_user)

@crypto_curr.route('/crypto/close-data',methods=['GET','POST'])
@login_required
def closeData():
    
    return render_template('prev.html',user=current_user)


@crypto_curr.route('/crypto/news',methods=['GET','POST'])
@login_required
def cryptoNews():
    
    return render_template('cryptonews.html',user=current_user)