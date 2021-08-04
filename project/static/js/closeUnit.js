const GHA = document.getElementById('getClose');
const GHSA = document.getElementById('coinName');
const refe = document.getElementById('refe')


var CVAA= "";

const tar=[];
const ca=[];
const TA=[];
const ha=[];
const la=[];
const har=[];
const va=[];
const vwa=[];
const na=[];
const oa=[];


GHA.addEventListener('submit', (e)=>{
    e.preventDefault();
   
    CVAA=GHSA.value;
    console.log(CVAA);
    requestData(CVAA);
});


async function requestData(cv){

const response = await fetch('https://api.polygon.io/v2/aggs/ticker/X:'+cv+'USD/prev?adjusted=true&apiKey=Uzuvj8JwkDonC3dGzEcxu42LcwwyBHUk');
const responseData= await response.json();
console.log(responseData);
showCloseData(responseData);
}
const  ochlvw=[];
const names=['v','vw','c','h','l','o'];
const nt=['t','n'];
const nta=[];
function showCloseData(reData){
    console.log(reData.resultsCount);
    const{results}=reData;
    if(reData.resultsCount<1){
        refe.innerHTML += `
            <h4 class="text-center">Sorry, no familiar currency exists when matched to your input symbol</h4>
        `
    }
    else{
        results.forEach(result=>{
            nta.push(result.t);
            ochlvw.push(result.v);
            ochlvw.push(result.vw);
            ochlvw.push(result.c);
            ochlvw.push(result.h);
            ochlvw.push(result.l);
            nta.push(result.n);
            ochlvw.push(result.o);
            TA.push(result.T);
            vwa.push(result.vw);
        })

    var options = {
        series:ochlvw,
     
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: names,
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      
      title: {
        text: 'Close Units'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          
          legend: {
            position: 'top'
          }
        }
      }]
      };

    
    
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

      var options1 = {
        series:nta,
     
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: nt,
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      
      title: {
        text: 'Close Units'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          
          legend: {
            position: 'top'
          }
        }
      }]
      };

    
    
      var chart = new ApexCharts(document.querySelector("#chart1"), options1);
      chart.render();
    
}

}