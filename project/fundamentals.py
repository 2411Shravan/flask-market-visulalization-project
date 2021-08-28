from flask import Flask
from flask import Blueprint
from flask import render_template
from flask import redirect
from flask import flash
from flask_login import current_user
from flask_login import login_required
from flask import request
from pprint import pprint
from datetime import date
import csv
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


@fundamentals.route('/fundamentals/all-exchanges/',methods=['GET','POST'])
@login_required
def exchanges():
    # url='https://api.twelvedata.com/exchanges?source=docs'
    # re=requests.get(url)
    # req=re.json()
    
    # dets=req['data']
    # pprint(dets['code'])
    return render_template('fundamentals/exchange.html',user=current_user)

@fundamentals.route('/fundamentals/all-tickers/',methods=['GET','POST'])
@login_required
def tickers():
    data=[]
    rich=True
    url='https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=1000&apiKey=Uzuvj8JwkDonC3dGzEcxu42LcwwyBHUk'

    while(rich):
        re=requests.get(url)
        req=re.json()
        # pprint(req['results'])
        # print('mid')
        
        
        
        data.append(req['results'])
        key_to_lookup = 'next_url'
        if req.__contains__(key_to_lookup):
            url=req['next_url']+'&active=true&sort=ticker&order=asc&limit=1000&apiKey=Uzuvj8JwkDonC3dGzEcxu42LcwwyBHUk'
        else:
            rich=False
        

    
    print(len(data))
    return render_template('fundamentals/alltickers.html',user=current_user,datas=data)




def intro(data):
    act=date.today()
    url='https://finnhub.io/api/v1/company-news?symbol='+data+'&from=2021-01-10&to='+f'{act}'+'&token=c2vgio2ad3i9mrpv9i2g'
    print(data)
    req=requests.get(url)
    datas=req.json()
    # dope.append(datas)
    message='Error in your input'
    pprint(datas)
   

    return datas

@fundamentals.route('/fundamentals/get-news/',methods=['GET','POST'])
@login_required
def getnews():
    
    if request.method == 'POST':
        name= request.form['companyName']
        datas = intro(name)
        return render_template('fundamentals/news.html',user=current_user,datas=datas)
    else:
        return render_template('fundamentals/getnews.html',user=current_user)

@fundamentals.route('/fundamentals/finance-insider/',methods=['GET','POST'])
@login_required
def insider():
    return render_template('fundamentals/insider.html',user=current_user)
  

def getEarnings(read):
    req=requests.get(read)
    datas=req.json()
    
    if datas: 
        return datas
    else:
        return 0



@fundamentals.route('/fundamentals/earnings/',methods=['GET','POST'])
@login_required
def earnings():
    message='No data found'
    xaxes=[];
    yaxes=[];
    rdate=[];
    reportedEPS=[];
    estimatedEPS=[];
    surprise=[];
    surprisePercentage=[];

    if request.method == 'POST':
        code = request.form['earning']
        # print(code)
        url='https://www.alphavantage.co/query?function=EARNINGS&symbol='+code+'&apikey=WH75LQJ4BD7S15TO'
        notes=getEarnings(url)
        if notes:
            cotes=notes['annualEarnings']
            gotes=notes['quarterlyEarnings']
            
            for i in cotes:
                xaxes.append(i['fiscalDateEnding'])
                yaxes.append(i['reportedEPS'])
                # print(i['fiscalDateEnding'])
                # print(i['reportedEPS'])

            for j in gotes:
                rdate.append(j['reportedDate'])
                reportedEPS.append(j['reportedEPS'])
                estimatedEPS.append(j['estimatedEPS'])
                surprise.append(j['surprise'])
                surprisePercentage.append(j['surprisePercentage'])
                print(j['surprisePercentage'])

            leny=len(yaxes)
            lenx=len(xaxes)
            return render_template('fundamentals/earnings.html',
            user=current_user,xaxes=xaxes,yaxes=yaxes,lenx=lenx,
            leny=leny,rdate=rdate,report=reportedEPS,estimate=estimatedEPS,sur=surprise,surprise=surprisePercentage)
        else:
            return render_template('fundamentals/earnings.html',
            user=current_user,message=message)

    return render_template('fundamentals/earnings.html',user=current_user)
   


@fundamentals.route('/fundamentals/ipo/',methods=['GET','POST'])
@login_required
def ipo():
    act=date.today()
    url='https://finnhub.io/api/v1/calendar/ipo?from=2020-01-01&to='+f'{act}'+'&token=c2vgio2ad3i9mrpv9i2g'
    req=requests.get(url)
    datas=req.json()
    # pprint(datas)
    results=datas['ipoCalendar']
    return render_template('fundamentals/ipo.html',user=current_user,datas=results)




@fundamentals.route('/fundamentals/market-news/',methods=['GET','POST'])
@login_required
def marketNews():
   
    url='https://finnhub.io/api/v1/news?category=general&token=c2vgio2ad3i9mrpv9i2g'
    req=requests.get(url)
    datas=req.json()
    pprint(datas)
    
    return render_template('fundamentals/generalNews.html',user=current_user,datas=datas)



@fundamentals.route('/fundamentals/filings/',methods=['GET','POST'])
@login_required
def filings():
   
    
    return render_template('fundamentals/sec.html',user=current_user)


# @fundamentals.route('/fundamentals/reported-financials/',methods=['GET','POST'])
# @login_required
# def reports():
#     # swData=[];
#     # bs=[];
#     # cf=[];
#     # ic=[];
#     # if request.method=='POST':

#     #     st=request.form['repfin']
#     #     url='https://finnhub.io/api/v1/stock/financials-reported?symbol='+st+'&token=c2vgio2ad3i9mrpv9i2g'
#     #     response=requests.get(url)
#     #     responseData=response.json()
#     #     reqData=responseData['data']
#     #     # pprint(responseData)
#     #     if(len(reqData) == 0):
#     #         message='error in fetching data.Check your code input again'
#     #         return render_template('fundamentals/repFin.html',user=current_user,st=message)
#     #     else:
#     #         for i in reqData:
#     #             sal=i['report']
                
#     #             bas=sal['bs'];
#     #             # caf=j['cf'];
#     #             # ica=j['ic'];
#     #             for k in bas:
#     #                 for gh in k:

#     #                     bs.append(k[gh])
#     #             # for l in caf:
#     #             #     cf.append(l['value'])
#     #             # for m in ica:
#     #             #     ic.append(m['value'])
                



#     #     pprint(bs)
#     #     return render_template('fundamentals/repFin.html',user=current_user,st=st)
    
#     return render_template('fundamentals/repFin.html',user=current_user)

@fundamentals.route('/fundamentals/basic-financials/')
@login_required
def basics():

    
    return render_template('fundamentals/basics.html',user=current_user)


@fundamentals.route('/fundamentals/income-statement/')
@login_required
def incomestatement():

    
    return render_template('fundamentals/income.html',user=current_user)