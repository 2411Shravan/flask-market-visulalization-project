const loadingPics = document.getElementById('cube');
const country= document.getElementById('country');

function countryCode(){
    console.log('hello world');
    loadingPics.style.display="block";
    getCurrencySymbols();
    
}


async function getCurrencySymbols(){
    const response = await fetch("https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ba2786a8fbmshc8e2bb00a0cdfcfp192bedjsne79d060f20c2",
            "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com"
        }
    });

    const responseData = await response.json();
    
    //console.log(responseData);
    showCurrency(responseData);
}

function showCurrency(responseResult){
    loadingPics.style.display="none";
    responseResult.forEach(response => {
        console.log(response);
        // console.log(response.currencies[0]);
        // console.log(response.name);
        country.innerHTML += `
                    <tr>
                    <th scope="row">${response.numericCode}</th>
                    <td>${response.name}</td>
                    <td>${response.currencies[0]}</td>
                    
                    </tr>
        `;
        
    })
}
