const requestA = document.getElementById('daily');
const currencyDataA = document.getElementById('currencyData');
const coinDataA = document.getElementById('cryptoData');
const chase = document.getElementById('chase');
const write = document.getElementById('write');

var CVAR= "";
var CDAR= "";

var res=[];
requestA.addEventListener('submit', (e)=>{
    chase.style.display='block';
    e.preventDefault();
    
    CVAR=currencyDataA.value;
    CDAR=coinDataA.value;
    console.log(CVAR,CDAR);
    getDataDialy(CVAR,CDAR);
    
});


async function getDataDialy(cvar,cdar){
    const response= await fetch('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol='+cdar+'&market='+cvar+'&apikey=WH75LQJ4BD7S15TO');
    const responseData =  await response.json();
    console.log(responseData);
    showDialyData(responseData);
}

function showDialyData(respData) {

//console.log(respData['Time Series (Digital Currency Daily)']);
const datas=respData['Time Series (Digital Currency Daily)'];
var objects = Object.keys(datas);
var objectsVals = Object.values(datas);
let i;
// console.log(objects);
        //     objects.forEach(object=>{
        //     //console.log(object);
        // });


        // for(var i=0;i<datas.length;i++) {
        //     console.log(Object.keys(datas[i]));
        //     console.log(i);
        // }
        //console.log(datas);
        // datas.forEach(data=>{
        //     console.log(data);
        // })

        for(i=0;i<objects.length;i++) {
            var resi={};
           // console.log(objects [i]);
            resi['x']=objects[i];
            //console.log(i);
            res.push(resi);
        }
var red=[];
    console.log(CVAR);
        for(i=0;i<objectsVals.length;i++) {
            var resi=[];
           
        //    console.log(objectsVals[i][`1a. open (${CVAR})`]);
        //    console.log(objectsVals[i][`2a. high (${CVAR})`]);
        //    console.log(objectsVals[i][`3a. low (${CVAR})`]);
        //    console.log(objectsVals[i][`4a. close (${CVAR})`]);


            resi.push(parseFloat(objectsVals[i][`1a. open (${CVAR})`]));
            resi.push(parseFloat(objectsVals[i][`2a. high (${CVAR})`]));
            resi.push(parseFloat(objectsVals[i][`3a. low (${CVAR})`]));
            resi.push(parseFloat(objectsVals[i][`4a. close (${CVAR})`]));
        red.push(resi);
        }
        // console.log(red);
        // console.log(res);
        // console.log(2+2);

        for(var j=0;j<objectsVals.length;j++){
            res[j]['y']=red[j];
        }
        console.log(res);
        chase.style.display='none';
        write.innerHTML+=`
        <h6 class="mb-3">1000 Days Daily History of ${CDAR} in ${CVAR} market</h6>
        `
        var options = {
            series: [{
            data: res
            
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
          console.log(res.length);
}