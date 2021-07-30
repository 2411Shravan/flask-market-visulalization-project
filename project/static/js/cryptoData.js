const loadingPic = document.getElementById('cube');
const currency= document.getElementById('currency');


function cryptoData(){
    console.log('hello world');
    loadingPic.style.display="block";
   
    getCryptoList();
}


async function getCryptoList(){
    const resp= await fetch("https://coinranking1.p.rapidapi.com/coins", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
            "x-rapidapi-host": "coinranking1.p.rapidapi.com"
        }
    });
    const respData= await resp.json();
    
    console.log(respData);
    showcrypto(respData);
    
}

function showcrypto(getData){
    const{data}=getData;
    const{coins}=data;
    loadingPic.style.display="none";
    coins.forEach(coin=>{
        console.log(coin);
        currency.innerHTML += `
                    <tr>
                    <th scope="row">${coin.id}</th>
                    <td>${coin.name}</td>
                    <td>${coin.symbol}</td>
                    
                    
                    </tr>
        `;
    })
}