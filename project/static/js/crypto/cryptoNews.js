const fader= document.getElementById('fader');
const conta= document.getElementById('conta');



const news=[];
function loadNews(){
    fader.style.display="block";
    console.log("Hello world!");
    getNews();
}

async function getNews(){
    const response = await fetch('https://finnhub.io/api/v1/news?category=crypto&token=c2vgio2ad3i9mrpv9i2g');
    const responseData = await response.json();
    console.log(responseData);
    fader.style.display="none";
    showNews(responseData);
}

function showNews(datas) {

    datas.forEach(data=>{
        news.push(data);
    });

    console.log(news);

    displayNews();
}

function displayNews() {
    
    news.forEach(ne=>{

        var timestamp = ne.datetime
        var date = new Date(timestamp);
       
        //console.log(date)

        conta.innerHTML += `
        <div class="card mt-3" style="border: 2px solid grey;">
        <div class="card-body">
            <div class="text-center"><h5>${ne.headline}</h5></div>
            <hr>
            <div class="container"><p>Source - ${ne.source}</p></div>
            <div class="container text-center" style="display:flex;align-items:center;justify-content:center">
            <div>
            <img src="${ne.image}" height=300px width=300px/>
            </div>
            </div>
            <div class="container mt-3"><h6>${ne.summary}</h6></div>
            <div class="container text-center mt-2">Read More....<a href="${ne.url}"><p>${ne.url}</p></a></div>
        </div>
        </div>
    
    `;
    })


}