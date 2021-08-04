
const fading = document.getElementById('fading')



const T=[];
const c=[];
const h=[];
const l=[];
const n=[];
const o=[];
const ta=[];
const v=[];
const vw=[];


function sub(){
    fading.style.display='block';
    console.log("hai hello");
    today = new Date();
    yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    var dd = yesterday.getDate();
    var mm = yesterday.getMonth()+1;
    var yyyy = yesterday.getFullYear();

    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
    yesterdayString = yyyy+'-'+mm+'-'+ dd;

    //console.log(yesterdayString);
    getGroupedData(yesterdayString);
}

async function getGroupedData(yString){
    console.log(yString);
    const response = await fetch('https://api.polygon.io/v2/aggs/grouped/locale/global/market/crypto/'+yString+'?adjusted=true&apiKey=Uzuvj8JwkDonC3dGzEcxu42LcwwyBHUk')
    const responseData = await response.json();
    console.log(responseData);
    showGroupedData(responseData);
}

function showGroupedData(response){
    const{results}=response;
    //console.log(results);

    results.forEach(result=>{
       // console.log(result);
        T.push(result.T);
        ta.push(result.t);
        c.push(result.c);
        h.push(result.h);
        n.push(result.n);
        l.push(result.l);
        o.push(result.o);
        v.push(result.v);
        vw.push(result.vw);
    })
    fading.style.display='none';
   // console.log(T,c,h,n,l,n,o,v,vw,t);

   var options = {
    series: [{
    name: "o",
    data: o
  },
  {
    name: "c",
    data: c
  },
  {
    name: "h",
    data: h
  },
  {
    name: "l",
    data: l
  },
  {
    name: "vw",
    data: vw
  }],
    chart: {
    type: 'area',
    height: 350,
    zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  
  title: {
    text: 'Crypto Grouped Data (d,c,h,l,vw)',
    align: 'left'
  },
  subtitle: {
    text: 'Market Grouped',
    align: 'left'
  },
  labels: T,
  xaxis: {
    labels:{
        show:false
      }
  },
  yaxis: {
    opposite: true,
    show:true

  },
  legend: {
      position:'top',
    horizontalAlign: 'left',
    onItemHover: {
        highlightDataSeries: true
    }
  },
  stacked: false,
                
                
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

  var options1 = {
    series: [{
    name: "n",
    data: n
  }
  ],
    chart: {
    type: 'area',
    height: 350,
    zoom: {
       
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
         
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  
  title: {
    text: 'Crypto Grouped Data (n)',
    align: 'left'
  },
  subtitle: {
    text: 'Market Grouped',
    align: 'left'
  },
  labels: T,
  xaxis: {
    labels:{
        show:false
      }
  },
  yaxis: {
    opposite: true,
    show:true

  },
  legend: {
      position:'top',
    horizontalAlign: 'left',
    
  },
  stacked: false,
   
                
  };

  var chart = new ApexCharts(document.querySelector("#chart1"), options1);
  chart.render();

  var options2 = {
    series: [{
    name: "v",
    data: v
  }
  ],
    chart: {
    type: 'area',
    height: 350,
    zoom: {
       
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
         
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  
  title: {
    text: 'Crypto Grouped Data (v)',
    align: 'left'
  },
  subtitle: {
    text: 'Market Grouped',
    align: 'left'
  },
  labels: T,
  xaxis: {
    labels:{
        show:false
      }
  },
  yaxis: {
    opposite: true,
    show:true

  },
  legend: {
      position:'top',
    horizontalAlign: 'left',
    
  },
  stacked: false,
   
                
  };

  var chart = new ApexCharts(document.querySelector("#chart2"), options2);
  chart.render();




  var options3 = {
    series: [{
    name: "t",
    data: ta
  }
  ],
    chart: {
    type: 'area',
    height: 350,
    zoom: {
       
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
         
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  
  title: {
    text: 'Crypto Grouped Data (t)',
    align: 'left'
  },
  subtitle: {
    text: 'Market Grouped',
    align: 'left'
  },
  labels: T,
  xaxis: {
    labels:{
        show:false
      }
  },
  yaxis: {
    opposite: true,
    show:true

  },
  legend: {
      position:'top',
    horizontalAlign: 'left',
    
  },
  stacked: false,
   
                
  };

  var chart = new ApexCharts(document.querySelector("#chart3"), options3);
  chart.render();
}