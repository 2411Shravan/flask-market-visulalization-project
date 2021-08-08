
const GH = document.getElementById('getHistory');
const GHS = document.getElementById('coin')


var CVA= "";



GH.addEventListener('submit', (e)=>{
    e.preventDefault();
   
    CVA=GHS.value;
    
    submitData();
});

async function submitData(){
    const response = await fetch("https://coinranking1.p.rapidapi.com/coin/"+CVA+"/history/7d", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
            "x-rapidapi-host": "coinranking1.p.rapidapi.com"
        }
    });

    const responseData = await response.json();
   console.log(responseData);
    showHistory(responseData);


}

const coins=[];
const datess=[];


function showHistory(datae){
    
    const{data}=datae;
    const{history}=data;
    console.log(history.length);

    history.forEach(hist=>{
        var timestamps = hist.timestamp;
        var date = new Date(timestamps);
        // console.log(date.getTime())
        // console.log(date);
        coins.push(parseFloat(hist.price));
        datess.push(date);
        // console.log(hist);
    });
    console.log(datess);
    console.log(coins);

    var options = {
        chart: {
          type: 'area'
        },
        series: [{
          name: 'price',
          data: coins
        }],
        xaxis: {
          categories:datess,
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