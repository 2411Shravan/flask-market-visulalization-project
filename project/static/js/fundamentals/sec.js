const requiredDataFiling=document.getElementById('getFiling');
const lol= document.getElementById('lol');
const loaf=document.getElementById('loafing');

requiredDataFiling.addEventListener('submit',function (e){
    
    e.preventDefault();
    console.log('hello world');
    loaf.style.display='block';
    var userInput=document.getElementById('firm').value;
    
    console.log(userInput);
    addAPI(userInput);
})

async function addAPI(API){
    var api='https://finnhub.io/api/v1/stock/filings?symbol='+API+'&token=c2vgio2ad3i9mrpv9i2g'
    const response = await fetch(api);
    const responseData= await response.json();
    //console.log(responseData);
    showFilings(responseData);
}

function showFilings(rsds){
    rsds.forEach(rsd=>{
        //console.log(rsd);
        var date=rsd.filedDate.slice(0,10);
        var filingData=rsd.filingUrl;
        var urldata=rsd.reportUrl;
        lol.innerHTML+=`
        <td>${date}</td>
        
        <td><a href=${filingData} target='_blank'>File Data</a></td>
        <td><a href=${urldata} target='_blank'>Report Data</a></td>

        `;

    });
    loaf.style.display='none';
}