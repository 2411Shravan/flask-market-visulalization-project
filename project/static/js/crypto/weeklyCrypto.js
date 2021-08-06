const requestAA = document.getElementById('weekly');
const currencyDataAA = document.getElementById('currencyDataa');
const coinDataAA = document.getElementById('cryptoDataa');
const chaseA = document.getElementById('chase');
const writeA = document.getElementById('write');

var CVARA= "";
var CDARA= "";
const week=[];

requestAA.addEventListener('submit', (e)=>{
    chaseA.style.display='block';
    e.preventDefault();
    
    CVARA=currencyDataAA.value;
    CDARA=coinDataAA.value;
    console.log(CVARA,CDARA);
   getWeeklyData(CVARA,CDARA);
    
});

async function getWeeklyData(cvara,cdara){
    const response = await fetch('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol='+CDARA+'&market='+CVARA+'&apikey=WH75LQJ4BD7S15TO');
    const responseData = await response.json();
    console.log(responseData);
    chaseA.style.display='none';
    showWeeklyData(responseData);
}

function showWeeklyData(rpData){
   // console.log(rpData['Time Series (Digital Currency Weekly)']);
    const datas = Object.keys(rpData['Time Series (Digital Currency Weekly)']);
   // console.log(datas);
    for(var i=0;i<datas.length;i++) {
        var resi={};
        // console.log(objects [i]);
         resi['x']=datas[i];
         //console.log(i);
         week.push(resi);
    }
    //console.log(week);
    var required=[];
    const dataseries = Object.values(rpData['Time Series (Digital Currency Weekly)']);
    console.log(dataseries);
    for(var i=0; i<dataseries.length; i++) {
        var ref=[];

        // console.log(dataseries[i][`1a. open (${CVARA})`]);
        // console.log(dataseries[i][`2a. high (${CVARA})`]);
        // console.log(dataseries[i][`3a. low (${CVARA})`]);
        // console.log(dataseries[i][`4a. close (${CVARA})`]);
        ref.push(dataseries[i][`1a. open (${CVARA})`]);
        ref.push(dataseries[i][`2a. high (${CVARA})`]);
        ref.push(dataseries[i][`3a. low (${CVARA})`]);
        ref.push(dataseries[i][`4a. close (${CVARA})`]);
        
        required.push(ref);

       
    }

    for(var j=0;j<required.length;j++){
        week[j]['y']=required[j];
    }

    console.log(week);
    write.innerHTML+=`
    <h6 class="mb-3">1000 Days Weekly History of ${CDARA} in ${CVARA} market</h6>
    `
    var options = {
        series: [{
        data: week
        
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