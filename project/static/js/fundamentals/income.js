const requiredIncome=document.getElementById('getIncomeSt');
// const lol= document.getElementById('lol');
// const loaf=document.getElementById('loafing');

requiredIncome.addEventListener('submit',function (e){
    
    e.preventDefault();
    console.log('hello world');
    
    var UI=document.getElementById('compa').value;
    var res=UI.toUpperCase();
    console.log(res);
    // getBasicFinData(res);
    getIncome(res);
})


var fde=[];
var cor=[];
var comprehensiveIncomeNetOfTax=[];
var costofGoodsAndServicesSold=[];
var depreciation=[];
var grossProfit=[];
var interestIncome=[];
var netIncome=[];
var operatingIncome=[];
var researchAndDevelopment=[];
var sellingGeneralAndAdministrative=[];
var totalRevenue=[];
var incomeTaxExpense=[];

function getIncome(resi){
    var api='https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol='+resi+'&apikey=WH75LQJ4BD7S15TO'
    fetchIncome(api);
}

async function fetchIncome(API){
    const response = await fetch(API);
    const responseData = await response.json();
   console.log(responseData);
   const{annualReports}=responseData;
    if(annualReports){
        startsortIncome(responseData);
    }
    else{
        console.log('wrong response');
    }
}

function startsortIncome(responses){
    const{annualReports,quarterlyReports} = responses;
    console.log(annualReports);
    // console.log(quarterlyReports);
    sortIncome(annualReports);
}

function sortIncome(annuals){
    annuals.forEach(annual=>{
        // console.log(annual);
        console.log(annual);
        fde.push(annual['fiscalDateEnding']);
        cor.push(parseInt(annual['costOfRevenue']));
        comprehensiveIncomeNetOfTax.push(parseInt(annual['comprehensiveIncomeNetOfTax']));
        costofGoodsAndServicesSold.push(parseInt(annual['costofGoodsAndServicesSold']));
        depreciation.push(parseInt(annual['depreciation']));
        grossProfit.push(parseInt(annual['grossProfit']));
        incomeTaxExpense.push(parseInt(annual['incomeTaxExpense']));
        interestIncome.push(parseInt(annual['interestIncome']));
        netIncome.push(parseInt(annual['netIncome']));
        operatingIncome.push(parseInt(annual['operatingIncome']));
        researchAndDevelopment.push(parseInt(annual['researchAndDevelopment']));
        sellingGeneralAndAdministrative.push(parseInt(annual['sellingGeneralAndAdministrative']));
        totalRevenue.push(parseInt(annual['totalRevenue']))
    });

    console.log(fde,cor,comprehensiveIncomeNetOfTax,costofGoodsAndServicesSold);

    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fde,
            datasets: [{
                label: 'Cost of revenue',
                data: cor,
                lineTension:0.5,
                fill:true,
                borderColor: '#b85e04', 
            },{
                label: 'comprehensive Tax',
                data: comprehensiveIncomeNetOfTax,
                lineTension:0.5,
                fill:true,
                borderColor: '#017a8f',
            },
            {
                label: 'cost of Goods And Services Sold',
                data: costofGoodsAndServicesSold,
                lineTension:0.5,
                fill:true,
                borderColor: '#3b0259',
            },
            {
                label: 'depreciation',
                data: depreciation,
                lineTension:0.5,
                fill:true,
                borderColor: '#CA18EF',
            },
            {
                label: 'grossProfit',
                data: grossProfit,
                lineTension:0.5,
                fill:true,
                borderColor: '#F111BF',
            },
            {
                label: 'interestIncome',
                data: interestIncome,
                lineTension:0.5,
                fill:true,
                borderColor: '#7B95CD', 
            },
            {
                label: 'netIncome',
                data: netIncome,
                lineTension:0.5,
                fill:true,
                borderColor: '#0B6D05',
            },
            {
                label: 'operatingIncome',
                data: operatingIncome,
                lineTension:0.5,
                fill:true,
                borderColor: '#778500', 
            },
            {
                label: 'research And Development',
                data: researchAndDevelopment,
                lineTension:0.5,
                fill:true,
                borderColor: '#E9BD07',
            },
            {
                label: 'selling General And Administrative',
                data: sellingGeneralAndAdministrative,
                lineTension:0.5,
                fill:true,
                borderColor: '#E97107', 
            },
            {
                label: 'income-Tax Expense',
                data: incomeTaxExpense,
                lineTension:0.5,
                fill:true,
                borderColor: '#E93C07', 
            },
            {
                label: 'totalRevenue',
                data: totalRevenue,
                lineTension:0.5,
                fill:true,
                borderColor: '#E9073C', 
            }]
        },
        options:{
            maintainAspectRatio: true,
            responsive:true,
    scales:{
        x: {
            display: false
        },
        y: {
            display: false
        }
    }
    }
    });
}