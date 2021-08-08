const requestForm = document.getElementById('getOpenclose');

const Coin = document.getElementById('cryptoCoin');


var CD= "";
const x =[];
const p=[];
const s=[];
const t=[];


const xo =[];
const po=[];
const so=[];
const to=[];

const openclose =['open','close'];
const ops=[];

var xaxes="";
const xdata=[];
const xopendata=[];


requestForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    
    CD=Coin.value;
    console.log(CD);
    getopenclose();
})

async function getopenclose(){
    const timea=yesterdayTime();
    const first='https://api.polygon.io/v1/open-close/crypto/';
    const second=CD;
    const third='/USD/'+timea+'?adjusted=true&apiKey=Uzuvj8JwkDonC3dGzEcxu42LcwwyBHUk';
    const response = await fetch(first+second+third);
    const responseData = await response.json();
    console.log(responseData);
    op(responseData);
}


function yesterdayTime(){
    today = new Date();
    yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    var dd = yesterday.getDate();
    var mm = yesterday.getMonth()+1;
    var yyyy = yesterday.getFullYear();

    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
    yesterdayString = yyyy+'-'+mm+'-'+ dd;

    console.log(yesterdayString);
    return yesterdayString;
}


function op(rpData){
    const{open,close,closingTrades,openTrades,symbol}=rpData;
    console.log(open,close);
    ops.push(open);
    ops.push(close);
    xaxes= symbol;
    closingTrades.forEach(trade=>{
        console.log(trade);
        x.push(trade['x']);
        p.push(trade['p']);
        s.push(trade['s']);
        t.push(trade['t']);
    })


    openTrades.forEach(trade=>{
      console.log(trade);
      xo.push(trade['x']);
      po.push(trade['p']);
      so.push(trade['s']);
      to.push(trade['t']);
  })

    for(var i=0;i<closingTrades.length;i++) {
        xdata.push(i+1);
    }
    console.log(xdata);
    console.log(x);

    var options = {
        series: [{
        name: "p",
        data: p
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Crypto Market - P',
        align: 'left'
      },
      subtitle: {
        text: 'Market Closure p rate',
        align: 'left'
      },
      labels: xdata,
      xaxis: {
        
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();



      var options1 = {
        series: [{
        name: "x",
        data: x
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Crypto Market - X',
        align: 'left'
      },
      subtitle: {
        text: 'Market Closure x rate',
        align: 'left'
      },
      labels: xdata,
      xaxis: {
        
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart1"), options1);
      chart.render();


      var options2 = {
        series: [{
        name: "s",
        data: s
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Crypto Market - S',
        align: 'left'
      },
      subtitle: {
        text: 'Market Closure s rate',
        align: 'left'
      },
      labels: xdata,
      xaxis: {
        
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart2"), options2);
      chart.render();


      var options3 = {
        series: [{
        name: "t",
        data: t
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Crypto Market - T',
        align: 'left'
      },
      subtitle: {
        text: 'Market Closure t rate',
        align: 'left'
      },
      labels: xdata,
      xaxis: {
       
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart3"), options3);
      chart.render();

      var options4 = {
        series: [{
        name: "p",
        data: po
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Crypto Market - P',
        align: 'left'
      },
      subtitle: {
        text: 'Market Open p rate',
        align: 'left'
      },
      labels: xdata,
      xaxis: {
        
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart4"), options4);
      chart.render();

      var options5 = {
        series: [{
        name: "x",
        data: xo
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Crypto Market - X',
        align: 'left'
      },
      subtitle: {
        text: 'Market Open x rate',
        align: 'left'
      },
      labels: xdata,
      xaxis: {
        
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart5"), options5);
      chart.render();


      var options6 = {
        series: [{
        name: "s",
        data: so
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Crypto Market - S',
        align: 'left'
      },
      subtitle: {
        text: 'Market Open s rate',
        align: 'left'
      },
      labels: xdata,
      xaxis: {
        
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart6"), options6);
      chart.render();


      var options7 = {
        series: [{
        name: "t",
        data: to
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Crypto Market - T',
        align: 'left'
      },
      subtitle: {
        text: 'Market Open t rate',
        align: 'left'
      },
      labels: xdata,
      xaxis: {
        
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart7"), options7);
      chart.render()


      var options8 = {
        series: [{
        name: "open close",
        data: ops
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Crypto Market Open and Close',
        align: 'left'
      },
      subtitle: {
        text: 'Market Open t rate',
        align: 'left'
      },
      labels: openclose,
      xaxis: {
        
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart8"), options8);
      chart.render()
      
      
}

