
const att=document.getElementById('attach');
const loading = document.getElementById('spinner');


async function getExchanges(){
    loading.style.display="block";
   const data = await fetch("https://coinranking1.p.rapidapi.com/exchanges", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
		"x-rapidapi-host": "coinranking1.p.rapidapi.com"
	}
        });
    const reqdata= await data.json();
    console.log(reqdata);
        showexchange(reqdata);
}

function showexchange(response){
    const{data}=response;
    const{exchanges}=data;
    console.log(exchanges);
    const divRow = document.createElement('div');
    loading.style.display="none";
    exchanges.forEach(exchange =>{
        // console.log(exchange.id);
        // console.log(exchange.uuid);
        // console.log(exchange.marketShare);
        // console.log(exchange.rank);
        // console.log(exchange.volume);
        // console.log(exchange.id);
        // console.log(exchange.iconUrl);
        // console.log(exchange.name);
        // console.log(exchange.websiteUrl);
        // console.log(exchange.lastTickerCreatedAt);
        att.innerHTML += `
                <tr>
                    <th scope="row">${exchange.rank}</th>
                    <td >${exchange.id}</td>
                    <td ><a href="${exchange.websiteUrl}">${exchange.name}</a> <img src="${exchange.iconUrl}" height="30" width="30"/></td>

                    <td >${exchange.uuid}</td>
                  </tr>
                  
        
        `;
    });
    
}