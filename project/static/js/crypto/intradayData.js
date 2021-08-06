
const request = document.getElementById('getIntraData');
const currencyData = document.getElementById('currency');
const coinData = document.getElementById('crypto');
const spin= document.getElementById('spinner');
var CV= "";
var CD= "";


request.addEventListener('submit', (e)=>{
    e.preventDefault();
    spin.style.display="block";
    CV=currencyData.value;
    CD=coinData.value;
    getIntraData();
});

const dates=[];
const high=[];
const low=[];
const open=[];
const close=[];
const volume=[];

const datesFinal=[];
const openfinal=[];
const closefinal=[];


const first  = 'https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=';
const second='&market=';
const third='&interval=5min&apikey=WH75LQJ4BD7S15TO';


async function getIntraData(){
     const response = await fetch(first+CD+second+CV+third);
    // const response = await fetch('https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${}&market=USD&interval=5min&apikey=WH75LQJ4BD7S15TO');
    const responseData = await response.json();
    
    console.log(responseData);
    showIntraData(responseData);
  
}

function showIntraData(responseResults){
    console.log(responseResults['Time Series Crypto (5min)']);
    const datas=responseResults['Time Series Crypto (5min)'];
    console.log(datas);
    var objectLenght = Object.keys(datas).length;
    console.log(objectLenght);
    var req = Object.keys(datas);
   // console.log(req);
    req.forEach(datf=>{
        //console.log(datf);
        dates.push(datf.slice(11,19));
    })
    var reqe = Object.values(datas);
    //console.log(reqe);
   // console.log(dates);

    reqe.forEach(date=>{
        open.push(parseFloat(date['1. open']));
        high.push(parseFloat(date['2. high']));
        low.push(parseFloat(date['3. low']));
        close.push(parseFloat(date['4. close']));
        volume.push(parseFloat(date['5. volume']));
    });

    //console.log(open,close,high,close,volume);
    spin.style.display="none";
    for(var i=0;i<50;i++){
        datesFinal[i]=dates[i];
    }

    for(var i=0;i<50;i++){
        openfinal[i]=open[i];
    }

    for(var i=0;i<50;i++){
        closefinal[i]=close[i];
    }


    // console.log(datesFinal);

    
var options = {
  chart: {
    type: 'area'
  },
  series: [{
    name: 'open',
    data: open
  },
  {
      name: 'close',
      data: close
    }],
  xaxis: {
    categories:dates,
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
          },legend: {
              position: 'top'
            }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();


var options1 = {
  chart: {
    type: 'area'
  },
  series: [{
    name: 'high',
    data: high
  },
  {
      name: 'low',
      data: close
    }],
  xaxis: {
    categories:dates,
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

var chart = new ApexCharts(document.querySelector("#chart1"), options1);

chart.render();


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: dates,
      datasets: [{
          label: 'Volume',
          data: volume,
          color:'#e75480',
          backgroundColor:'#e75480',
          borderColor:'#e75480'
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true,
              display:false
          }
      }
  }
});

}

