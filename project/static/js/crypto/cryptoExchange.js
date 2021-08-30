const formVal = document.getElementById('exchange');
const currencyVal = document.getElementById('exchangeCurrency');
const coinsVal = document.getElementById('exchangeCrypto');
const exercise = document.getElementById('getExchangeData');
// const spins = document.getElementById('spins');
// const writer = document.getElementById('writer');

var CoinInput= "";
var CurInput= "";
// const exchange=[];
var arr_exc=['bid_price','ask_price'];
var prices=[];

formVal.addEventListener('submit', (e)=>{
    // spins.style.display='block';
    e.preventDefault();
    
    CoinInput=currencyVal.value;
    CurInput=coinsVal.value;
    console.log(CurInput,CoinInput);
    getExchangeData(CurInput,CoinInput);
    
});

async function getExchangeData(curDat,coinDat){
    const response = await fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+curDat+'&to_currency='+coinDat+'&apikey=WH75LQJ4BD7S15TO');
    const responseData= await response.json();
    console.log(responseData);
    showExchangeData(responseData);

}

function showExchangeData(reData) {

    console.log(reData['Realtime Currency Exchange Rate']);
    const datas=reData['Realtime Currency Exchange Rate'];
    console.log(datas['1. From_Currency Code']);
    prices.push(datas['8. Bid Price']);
    prices.push(datas['9. Ask Price']);

    exercise.innerHTML += `
    
    <div class="card">
        <div class="card-body">
            <h6 class="text-center"> From ${datas['2. From_Currency Name']} ---> To ${datas['4. To_Currency Name']}</h6>
            <hr>
            <h6 class=""> Exchange Rate - ${datas['5. Exchange Rate']}</h6>
            <h6 class=""> Time Zone - ${datas['7. Time Zone']}</h6>
            <h6 class=""> Bid Price - ${datas['8. Bid Price']}</h6>
            <h6 class=""> Ask Price - ${datas['9. Ask Price']}</h6>
        </div>
    </div>
    
    `;

    var options = {
        chart: {
          type: 'area'
        },
        series: [{
          name: 'Exchange Rates',
          data: prices
        }],
        xaxis: {
          categories:arr_exc,
          labels:{
            show:false
          }
        },
        grid: {
            position: 'front'
          },
        yaxis: [{
            opposite: true,
            show:false,
            label:{
                style: {
                    color: '#e45rt5',
                    background: '#00E396'
                  
            }
          },
          }],
          stacked: false,
                height: 350,
                zoom: {
                  type: 'x',
                  enabled: true,
                  autoScaleYaxis: true
                },legend: {
                    position: 'top'
                  }
      }
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();


}