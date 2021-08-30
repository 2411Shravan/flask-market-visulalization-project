const signup = document.querySelector('#insiderForm');
const tbody=document.querySelector('#tbody')
signup.addEventListener('submit', (e) =>{
e.preventDefault();
const sym=signup['insiderName'].value;
console.log(sym);

getInsider(sym);
        }
    )

async function getInsider(sym){
    const response = await fetch('https://finnhub.io/api/v1/stock/insider-transactions?symbol='+sym+'&token=c2vgio2ad3i9mrpv9i2g');
    const responseData= await response.json();
    console.log(responseData);
    showInsiders(responseData);
}

function showInsiders(response){
    const{data}=response;
    console.log(data);

    data.forEach(dat=>{
        var change="";
        var share="";
        if (dat.change<0){
            change='danger';
            console.log(change);
        }
        else if (dat.change=0){
            change='primary';
            console.log(change);
        }
        else{
            change='success';
            console.log(change);
        }

        if (dat.share<0){
            share='danger';
            console.log(share);
        }
        else if (dat.share=0){
            share='primary';
            console.log(share);
        }
        else{
            share='success';
            console.log(share);
        }

        tbody.innerHTML += `
        <tr>
            <td><p class=text-${change}>${dat.change}</p></td>
            <td class=text-${share}>${dat.share}</td>
            <td>${dat.name}</td>
            <td>${dat.transactionPrice}</td>
        </tr>
        `
    })
}