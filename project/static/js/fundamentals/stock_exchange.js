const table=document.getElementById('tableBody');
const loader_pic =document.getElementById('loader');


function getStockExchanges(){
    var api = 'https://api.twelvedata.com/exchanges?source=docs'
    extractApi(api);
}

async function extractApi(API){
  
    loader_pic.style.display = 'block';
  
    const response = await fetch(API)
    const responseData = await response.json();
    console.log(responseData);
    showApiData(responseData);
}

function showApiData(responses){
    const {data}=responses;
    console.log(data);
    loader_pic.style.display = 'none';
    

    data.forEach(data=>{
        console.log(data);
        table.innerHTML+=`
        <tr>
        <td>${data.name}</td>
        <td>${data.code}</td>
        <td>${data.country}</td>
      
      </tr>
        `
    })
}