function getIPO(){
   // console.log('hello world');
    today=todaysDate();
   // console.log(today);
    getIPOInfo(today);
}


const namesIPO=[];
const sharevalue=[];
const price=[];
const sharenumber=[];

function todaysDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
   var date = yyyy + '-' + mm + '-' + dd;

    return date;
}

function getIPOInfo(date){
    var api='https://finnhub.io/api/v1/calendar/ipo?from=2020-01-01&to='+date+'&token=c2vgio2ad3i9mrpv9i2g';
    retData(api);
}


async function retData(API){
    const response = await fetch(API);
    const responseData = await response.json();
 //   console.log(responseData);
    displayRETData(responseData);
}


function displayRETData(responses){
    const{ipoCalendar}=responses;
   // console.log(ipoCalendar);
    ipoCalendar.forEach(ipo=>{
       // console.log(ipo);
        namesIPO.push(ipo.name);
        var cric=ipo.totalSharesValue;
        if(cric===null){
            sharevalue.push(0);
        }
        else{
            sharevalue.push(parseFloat(cric));
        }
     
        var crice = ipo.price;
        if(crice===null){
            price.push(0);
        }
        else{
            price.push(parseFloat(crice));
        }

        var criced = ipo.numberOfShares;
        if(criced===null){
            sharenumber.push(0);
        }
        else{
            sharenumber.push(parseFloat(criced));
        }
       
     

    })

    //console.log(namesIPO,sharevalue,price,sharenumber);

    var options = {
        chart: {
          type: 'area'
        },
        series: [{
          name: 'Total Share Value',
          data: sharevalue
        }
        ],
        xaxis: {
          categories:namesIPO,
          labels:{
            show:false
          }
        },
        yaxis: {
            opposite: false,
            show:false
          },
          stacked: false,
                height: 350,
                zoom: {
                  type: 'x',
                  enabled: true,
                  autoScaleYaxis: true
                },legend: {
                    position: 'bottom'
                  }
      }

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    
    

      var options1 = {
        chart: {
          type: 'area'
 
        },
        series: [
        {
            name: 'Total Number of Shares',
            data: sharenumber
          }],
        xaxis: {
          categories:namesIPO,
          labels:{
            show:false
          }
        },
        yaxis: {
            opposite: false,
            show:false
          },
          stacked: false,
                height: 350,
                zoom: {
                  type: 'x',
                  enabled: true,
                  autoScaleYaxis: true
                },legend: {
                    position: 'bottom'
                  }
      }

      var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
      chart1.render();
  


      var options2 = {
        chart: {
          type: 'area'
 
        },
        series: [
        {
            name: 'Price',
            data: price
          }],
        xaxis: {
          categories:namesIPO,
          labels:{
            show:false
          }
        },
        yaxis: {
            opposite: false,
            show:false
          },
          stacked: false,
                height: 350,
                zoom: {
                  type: 'x',
                  enabled: true,
                  autoScaleYaxis: true
                },legend: {
                    position: 'bottom'
                  }
      }

      var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
      chart2.render();
}