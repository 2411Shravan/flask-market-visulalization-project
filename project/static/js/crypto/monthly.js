const forma = document.getElementById('monthly');
const currencyMonthly = document.getElementById('monthlydata');
const coinMonthly = document.getElementById('mcryptoData');
const spins = document.getElementById('spins');
const writer = document.getElementById('writer');

var CoinInp= "";
var CurInp= "";
const month=[];

forma.addEventListener('submit', (e)=>{
    spins.style.display='block';
    e.preventDefault();
    
    CurInp=currencyMonthly.value;
    CoinInp=coinMonthly.value;
    console.log(CurInp,CoinInp);
    getMonthlyData(CurInp,CoinInp);
    
});

async function getMonthlyData(Cur,Coin){

    // console.log(Cur,Coin);
    const  response = await fetch('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol='+Coin+'&market='+Cur+'&apikey=WH75LQJ4BD7S15TO');
    const responseData= await response.json();
    console.log(responseData);
    showMonthlyData(responseData);
    
}


function showMonthlyData(response){
    //console.log(response['Time Series (Digital Currency Monthly)']);
    const datas = Object.keys(response['Time Series (Digital Currency Monthly)']);
    console.log(datas);
    for(var i=0;i<datas.length;i++){
       // console.log(datas[i]);
       var ref={};
       ref['x']=datas[i];
       month.push(ref);
    }
    //console.log(month);
    const requests = Object.values(response['Time Series (Digital Currency Monthly)']);
    // requests.forEach(request=>{
    //     console.log(request);
    // })
    var results=[];
    for(var i=0;i<requests.length;i++){
        var required=[];
        required.push(requests[i][`1a. open (${CurInp})`]);
        required.push(requests[i][`2a. high (${CurInp})`]);
        required.push(requests[i][`3a. low (${CurInp})`]);
        required.push(requests[i][`4a. close (${CurInp})`]);
        results.push(required);
    }



    for(var j=0;j<results.length;j++){
        month[j]['y']=results[j];
    }

    console.log(month);
    spins.style.display='none';
    writer.innerHTML+=`
    <h6 class="mb-3">1000 Days Monthly  History of ${CoinInp} in ${CurInp} market</h6>
    `



    var options = {
        series: [{
        data: month
        
      }],
        chart: {
        type: 'candlestick',
        height: 400
      },
      
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        },
        show:false
      }
      };

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();




}