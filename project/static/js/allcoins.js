const coined = document.getElementById('coins');
const load= document.getElementById('cubic');



var it = [];
let ite=0;

const final_arr=[];
const data_arr=[];
async function after(){
    load.style.display="block";
    const response = await fetch("https://coinranking1.p.rapidapi.com/coins", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
            "x-rapidapi-host": "coinranking1.p.rapidapi.com"
        }
    });
    const responseData= await response.json();
    //console.log(responseData);
    afterCoins(responseData);
}

function afterCoins(resp){
    const{data}=resp;
    const{coins}=data;
   console.log(coins);

    coins.forEach(coin=>{
        //console.log(coin);
        var object ={};
        object['change']=coin.change;
        object['supply']=coin.approvedSupply;
        object['circulatingSupply']=coin.circulatingSupply;
        object['confirmedSupply']=coin.confirmedSupply;
        object['firstSeen']=coin.firstSeen;
        object['id']=coin.id;
        object['iconUrl']=coin.iconUrl;
        object['listedAt']=coin.listedAt;
        object['marketCap']=coin.marketCap;
        object['name']=coin.name;
        object['numberOfExchanges']=coin.numberOfExchanges;
        object['numberOfMarkets']=coin.numberOfMarkets;
        object['rank']=coin.rank;
        object['symbol']=coin.symbol;
        object['totalSupply']=coin.totalSupply;
        object['type']=coin.type;
        object['links']=coin.links;
        object['uuid']=coin.uuid;
        object['volume']=coin.volume;
        object['price']=coin.price;
        object['history']=coin.history;
        object['websiteUrl']=coin.websiteUrl;
        final_arr.push(object);


        
    });
    //console.log(final_arr);

    showCryptoHistory();
}

function showCryptoHistory() {
    load.style.display="none";
    final_arr.forEach(data=>{
        //console.log(data);
        //console.log(data.history.length);
        
        for(var i=0;i<data.history.length;i++) {
            data_arr.push(i+1);
        }
       // console.log(data_arr);
       var timestamp = data.firstSeen
        var date = new Date(timestamp);
        var final = date.toString().slice(4,15);
        //console.log(date)

        var at = data.listedAt
        var datae = new Date(at);
       // var final = date.toString().slice(4,15);

        coined.innerHTML += `
        
        <div class="card mt-5" style="border:2px solid grey;">
        <div class="card-body">
            <div class="container text-center">
                <h4> ${data.name} - ${data.symbol}</h4>
            </div>
            <div class="container text-center">
               <img src='${data.iconUrl}' width="100px" height="100px">
               <p><a href='${data.websiteUrl}' target='_blank'>${data.websiteUrl}</a></p>
               <hr style="border:0.6px solid grey;">
            </div>
            <div class="container">
              <p>Currency Type - ${data.type}</p>  
            </div>
            <div class="container">
              <p>Currency Rank - ${data.rank}</p>  
            </div>
            <div class="container">
              <p>First Apperance - ${final}</p>  
            </div>
            <div class="container">
              <p>Total Market Capital - ${data.marketCap} units</p>  
            </div>
            <div class="container">
              <p>Total Worked/Working Exchanges  - ${data.numberOfExchanges} </p>  
            </div>
            <div class="container">
              <p>Total Worked/Working Markets  - ${data.numberOfMarkets} </p>  
            </div>
            <div class="container">
              <p>Current Price - ${data.price} </p>  
            </div>
            <div class="container">
              <p>Total Supply - ${data.totalSupply} </p>  
            </div>
            <div class="container">
              <p>Total Volume(Gen..) - ${data.volume} </p>  
            </div>
            <h5 class="text-center mt-5">Current ${data.name} trend thorugh graphical analysis</h5>
            <div class="w-80" align="right">
                <div id="chart${data.id}"></div>
            </div>
            
        </div>
        </div>

        
        `
        ite++;
        it.push(ite);
        
    });
    

        console.log(it);
        
        final_arr.forEach(data=>{
           // console.log(data);
            var options = {
                chart: {
                  type: 'area'
                },
                series: [{
                  name: `${data.name}`,
                  data: data.history
                }],
                xaxis: {
                  categories:data_arr,
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
              var chart = new ApexCharts(document.querySelector("#chart"+`${data.id}`), options);
              chart.render();
        });


        
    
}