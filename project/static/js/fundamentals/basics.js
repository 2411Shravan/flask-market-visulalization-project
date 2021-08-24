const requiredDataBasics=document.getElementById('getBasicsFin');
// const lol= document.getElementById('lol');
// const loaf=document.getElementById('loafing');

requiredDataBasics.addEventListener('submit',function (e){
    
    e.preventDefault();
    console.log('hello world');
    
    var UI=document.getElementById('comp').value;
    var res=UI.toUpperCase();
    console.log(res);
    getBasicFinData(res);
})

var oneone=[];
var onetwo=[];
var onethree=[];
var period=[];
var netone=[];
var nettwo=[];
var netthree=[];


function getBasicFinData(result){
    var api='https://finnhub.io/api/v1/stock/metric?symbol='+result+'&metric=all&token=c2vgio2ad3i9mrpv9i2g'
    fetchBasicFinance(api);
}

async function fetchBasicFinance(api){
    const response = await fetch(api);
    const responseData =await response.json();
    //console.log(responseData);
    showD(responseData);
}

function showD(response){
    const{series}=response;
   // console.log(series);
    const{annual,quarterly}=series;
   // console.log(annual);
    const{longtermDebtTotalAsset,longtermDebtTotalCapital,longtermDebtTotalEquity,netDebtToTotalCapital,netDebtToTotalEquity,netMargin}=annual;
    longtermDebtTotalAsset.forEach(lt=>{
        oneone.push(lt['v']);
        period.push(lt['period'])
    });
    netDebtToTotalCapital.forEach(nd=>{
        netone.push(nd['v'])
    })

    netDebtToTotalEquity.forEach(nd=>{
        nettwo.push(nd['v'])
    })

    netMargin.forEach(nd=>{
        netthree.push(nd['v'])
    })


    longtermDebtTotalCapital.forEach(ld=>{
        onetwo.push(ld['v'])
    });
    longtermDebtTotalEquity.forEach(ldt=>{
        onethree.push(ldt['v'])
    });


    console.log(oneone);
    console.log(onetwo);
    console.log(onethree);

    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: period,
            datasets: [{
                label: 'longtermDebtTotalAsset',
                data: oneone,
                lineTension:0.5,
                fill:true,
                borderColor: '#b85e04',
                backgroundColor:'#ebbd8f'
               
            },{
                label: 'longtermDebtTotalCapital',
                data: onetwo,
                lineTension:0.5,
                fill:true,
                borderColor: '#017a8f',
                backgroundColor:'#a0dfeb'
               
            },
            {
                label: 'longtermDebtTotalEquity',
                data: onethree,
                lineTension:0.5,
                fill:true,
                borderColor: '#3b0259',
                backgroundColor:'#c09dd4'
               
            }]
        },
        options:{
            maintainAspectRatio: true,
        responsive:true,
    scales:{
        x: {
            display: false
        }
    }
    }
    });


    var ctxe = document.getElementById('chart1').getContext('2d');
    var myChart = new Chart(ctxe, {
        type: 'line',
        data: {
            labels: period,
            datasets: [{
                label: 'netDebtToTotalCapital',
                data: netone,
                lineTension:0.5,
                fill:true,
                borderColor: '#b85e04',
                backgroundColor:'#ebbd8f'
               
            },{
                label: 'netDebtToTotalEquity',
                data: nettwo,
                lineTension:0.5,
                fill:true,
                borderColor: '#017a8f',
                backgroundColor:'#a0dfeb'
               
            },
            {
                label: 'netMargin',
                data: netthree,
                lineTension:0.5,
                fill:true,
                borderColor: '#3b0259',
                backgroundColor:'#c09dd4'
               
            }]
        },
        options:{
            maintainAspectRatio: true,
        responsive:true,
    scales:{
        x: {
            display: false
        }
    }
    }
    });
}