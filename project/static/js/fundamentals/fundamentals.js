const spinner_load = document.getElementById('load_spinner');

function getStock(){
    spinner_load.style.display = 'block';
    console.log('hwllo world');
    var api = 'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c2vgio2ad3i9mrpv9i2g';
    getStocks(api);
}

async function getStocks(API){
    const response = await fetch(API);
    const responseData=await response.json();
    console.log(responseData);
    spinner_load.style.display = 'none';
}