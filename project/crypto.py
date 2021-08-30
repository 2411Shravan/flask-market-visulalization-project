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
    return render_template('crypto/CryptoDatas/exchange.html',user=current_user)

@crypto_curr.route('/crypto/globalstats/')
@login_required
def globalstats():
    return render_template('crypto/CryptoDatas/globalstats.html',user=current_user)

@crypto_curr.route('/crypto/market/')
@login_required
def cryptomarket():
    return render_template('crypto/CryptoDatas/cryptomarket.html',user=current_user)


@crypto_curr.route('/crypto/intraday/five-minutes-delay/')
@login_required
def intradayData():
    return render_template('crypto/CryptoDatas/intraday.html',user=current_user)


@crypto_curr.route('/crypto/country-codes/')
@login_required
def countrycodes():
    return render_template('crypto/CryptoDatas/countrycode.html',user=current_user)


@crypto_curr.route('/crypto/crypto-codes/')
@login_required
def cryptocodes():
    return render_template('crypto/CryptoDatas/cryptocode.html',user=current_user)





@crypto_curr.route('/crypto/daily/open-close',methods=['GET', 'POST'])
@login_required
def openclose():
    return render_template('crypto/CryptoDatas/openclose.html',user=current_user)



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

    
    return render_template('crypto/CryptoDatas/coinhistory.html',user=current_user)

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

    
    return render_template('crypto/CryptoDatas/coins.html',user=current_user)

    


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

    
    return render_template('crypto/CryptoDatas/singlecoin.html',user=current_user)





@crypto_curr.route('/crypto/grouped-data',methods=['GET','POST'])
@login_required
def groupedData():
    
    return render_template('crypto/CryptoDatas/grouped.html',user=current_user)

@crypto_curr.route('/crypto/close-data',methods=['GET','POST'])
@login_required
def closeData():
    
    return render_template('crypto/CryptoDatas/prev.html',user=current_user)


@crypto_curr.route('/crypto/news',methods=['GET','POST'])
@login_required
def cryptoNews():
    
    return render_template('crypto/CryptoDatas/cryptonews.html',user=current_user)


@crypto_curr.route('/crypto/daily',methods=['GET','POST'])
@login_required
def daily():
    
    return render_template('crypto/CryptoDatas/daily.html',user=current_user)

@crypto_curr.route('/crypto/weekly',methods=['GET','POST'])
@login_required
def weekly():
    
    return render_template('crypto/CryptoDatas/weekly.html',user=current_user)



@crypto_curr.route('/crypto/monthly',methods=['GET','POST'])
@login_required
def monthly():
    
    return render_template('crypto/CryptoDatas/monthly.html',user=current_user)

@crypto_curr.route('/crypto/exchange/',methods=['GET','POST'])
@login_required
def exchange():
    
    return render_template('crypto/CryptoDatas/cryptoExchange.html',user=current_user)