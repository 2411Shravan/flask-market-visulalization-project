const requiredIncome=document.getElementById('getIncomeSt');
// const lol= document.getElementById('lol');
// const loaf=document.getElementById('loafing');

requiredIncome.addEventListener('submit',function (e){
    
    e.preventDefault();
    console.log('hello world');
    
    var UI=document.getElementById('compa').value;
    var res=UI.toUpperCase();
    console.log(res);
    // getBasicFinData(res);
    getIncome(res);
})

function getIncome(resi){
    var api='https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol='+resi+'&apikey=WH75LQJ4BD7S15TO'
    fetchIncome(api);
}

async function fetchIncome(API){
    const response = await fetch(API);
    const responseData = await response.json();
   // console.log(responseData);
    sortIncome(responseData);
}

function sortIncome(responses){
    const{annualReports}=responses;
    console.log(annualReports);
}