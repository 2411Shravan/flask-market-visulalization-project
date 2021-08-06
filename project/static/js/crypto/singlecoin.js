const form = document.getElementById('singleCoin');
const formData = document.getElementById('cryptoCoinId');
const join = document.getElementById('append');
const redi= document.getElementById('ref');
const spinner = document.getElementById('spinner');

const array_datae=[];
let number = 0;


var COIN= "";



form.addEventListener('submit', (e)=>{
    e.preventDefault();
   
    COIN=formData.value;
    spinner.style.display="block";
    SubmitData(COIN);
});


async function SubmitData(result){

 const response = await fetch("https://coinranking1.p.rapidapi.com/coin/"+result, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
		"x-rapidapi-host": "coinranking1.p.rapidapi.com"
	}
});

const responseData= await response.json();
ShowCoinData(responseData);

}

function ShowCoinData(resData){
    
    console.log(resData);
    const{data}=resData;
    const{base,coin}=data;
    console.log(coin);
    console.log(base.symbol);
    const dist =coin.links;

    var timestamp = coin.firstSeen;
    var date = new Date(timestamp);
    var final = date.toString().slice(4,15);
    const herd= coin.history;

    herd.forEach(her=>{
        number++;
        array_datae.push(number);
    })
    const fi = coin.change;
    
    spinner.style.display="none";

    join.innerHTML += `
    <div class="card mt-5" style="border:1.6px solid grey">
            <div class="card-body text-center" >
            <div class="text-center"> <h5>${coin.name} - ${coin.symbol}</h5></div>
            <img src="${coin.iconUrl}" height=60px width=60px alt="${coin.name}"/>
            <p><a href="${coin.websiteUrl}" target='_blank'>${coin.websiteUrl}</a></p>
            <hr style="border:0.4px solid grey">
            </div>
            <div class="container" style="width:80%">
            <div class="container"><p>International Currency Id - ${coin.id}</p></div>
            <div class="container"><p>Currency Type - ${coin.type}</p></div>
            <div class="container"><p>Currency Rank -  ${coin.rank}</p></div>
            <div class="container"><p>Supply Approved -  ${coin.approvedSupply} "&" Supply Confirmed - ${coin.confirmedSupply}</p></div>
            <div class="container"><p>First Global Appearnce -  ${final}</p></div>
            <div class="container"><p>Current Market Capital -  ${coin.marketCap}</p></div>
            <div class="container"><p>Current Volume -  ${coin.volume}</p></div>
            <div class="container"><p>Current Circulating Supply -  ${coin.circulatingSupply} unit</p></div>
            <div class="container"><p>Exchanges -  ${coin.numberOfExchanges}</p></div>
            <div class="container"><p>Markets -  ${coin.numberOfMarkets}</p></div>
            <div class="container"><p>Current Price -  ${coin.price}</p></div>
            <div class="container"><p>Total Market Supply -  ${coin.totalSupply}</p></div>
            </div>
            <div class="container mt-5">
                <h5 class="text-center">Current ${coin.name} trend through graphical analysis</h5>
                <div id="chart"></div>
            </div>
        </div>
        
    
    `;

    var options = {
        chart: {
          type: 'area'
        },
        series: [{
          name: `${coin.name}`,
          data: coin.history
        }],
        xaxis: {
          categories:array_datae,
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