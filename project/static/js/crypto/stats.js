const tobeJioned = document.getElementById('global-stats');

async function loadstats(){
    const response = await fetch("https://coinranking1.p.rapidapi.com/stats", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
            "x-rapidapi-host": "coinranking1.p.rapidapi.com"
        }
    });

    const responseData = await response.json();
    console.log(responseData);
    showdata(responseData);
}

function showdata(resp){
    let draw= document.createElement('div');
    draw.className+='container'
    const{data} = resp;

    draw.innerHTML=`
        <h5>Total Coins - ${data.totalCoins}</h5>
        <h5>Total Markets - ${data.totalMarkets}</h5>
        <h5>Total Exchanges - ${data.totalExchanges}</h5>
        <h5>Total Market Capital - ${data.totalMarketCap}</h5>
        <h5>Total 24 Hour Volume - ${data.total24hVolume}</h5>
    
    `;

tobeJioned.appendChild(draw);
}