const finalData=document.getElementById('attachData');
const toload = document.getElementById('load');

var idData=[];
var marketshare=[];
var Price=[];
var tbV=[];
var tc=[];
var tqV=[];
var volumeData=[];

async function getMarket(){
    toload.style.display="block";
    const response = await fetch("https://coinranking1.p.rapidapi.com/markets", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
            "x-rapidapi-host": "coinranking1.p.rapidapi.com"
        }
    });
    const responseData = await response.json();
    console.log(responseData);
    showMarkets(responseData);
}

function showMarkets(responseResult){
const{data}=responseResult;
const{markets}=data;

markets.forEach(market=>{
    // console.log(market.id);
    // console.log(market.sourceName);
    // console.log(market.quoteSymbol);
    // console.log(market.baseSymbol);
    idData.push(market.id);
    marketshare.push(market.marketShare);
    Price.push(market.price);
    tbV.push(market.tickerBaseVolume);
    tc.push(market.tickerClose);
    tqV.push(market.tickerQuoteVolume);
    volumeData.push(market.volume);
    toload.style.display="none";
    finalData.innerHTML += `
                <tr>
                    <th scope="row">${market.id}</th>
                    <td >${market.baseSymbol}</td>
                    <td >${market.sourceName} <img src="${market.sourceIconUrl}" height="30" width="30"/></td>

                    <td >${market.quoteSymbol}</td>
                  </tr>
                  
        
        `;
})

console.log(idData);
console.log(marketshare);
console.log(Price);
console.log(tbV);
console.log(tc);
console.log(tqV);
console.log(volumeData);





var options = {
    chart: {
      type: 'area'
    },
    series: [{
      name: 'marketshare',
      data: marketshare
    },
            {
      name: 'Price',
      data: Price
    }

    ],
    xaxis: {
      categories: idData,
      labels:{
        show:false
      }
    },
    yaxis: {
      opposite: true,
      show:false
    },
    stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();




  var options = {
    chart: {
      type: 'area'
    },
    series: [{
      name: 'Ticker Base Volume',
      data: tbV
    },
            {
      name: 'Ticker Quote Volume',
      data: tqV
    },
    {
        name: 'Ticker Close',
        data: tc
      },
      {
        name: 'Volume',
        data: volumeData
      }

    ],
    xaxis: {
      categories: idData,
      labels:{
        show:false
      }
    },
    yaxis: {
      opposite: true,
      show:false
    },
    stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart2"), options);
  
  chart.render();












}