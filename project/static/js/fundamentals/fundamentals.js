const spinner_load = document.getElementById('load_spinner');
const head = document.getElementById("head")

const arr_stock=[];
function getStock(){
    spinner_load.style.display = 'block';
    head.style.display = 'none';
   // console.log('hwllo world');
    var api = 'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c2vgio2ad3i9mrpv9i2g';
    getStocks(api);
}

async function getStocks(API){
    const response = await fetch(API);
    const responseData=await response.json();
   // console.log(responseData);
    showStocks(responseData);
    
}
function showStocks(datas){

    datas.forEach(data=>{
        var obj={};
        obj['name']=data.description;
        obj['currency']=data.currency;
        obj['symbol']=data.displaySymbol;
        // obj['mic']=data.mic;
        obj['type']=data.type;
      //  console.log(data);
        arr_stock.push(obj);
    });

    spinner_load.style.display = 'none';
    console.log(arr_stock);
    //BuildTable();
    var table = $('#table-body')

    // var data = Pagination(state.querySet, state.page, state.rows)
    // var myList = data.querySet;
    head.style.display = 'block';
    // console.log(myList);
    // console.log('hello world');
    for (var i = 1 in arr_stock) {
        //Keep in mind we are using "Template Litterals to create rows"
       // console.log('hello world');
        var row = `<tr class="change-font">
                  <td >${arr_stock[i].currency}</td>
                  
                  <td >${arr_stock[i].name}</td>
                  <td >${arr_stock[i].symbol}</td>
                  <td >${arr_stock[i].type}</td>
                  `
        table.append(row)
    }
}

var State = {
    'querySet': arr_stock,
    'page': 1,
    'rows': 25,
    'window': 5,
}

function Pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
	console.log('pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
        	maxLeft = 1
        }
        maxRight = pages
    }
    
    

    for (var page = maxLeft; page <= maxRight; page++) {
    	wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function() {
        $('#table-body').empty()

        state.page = Number($(this).val())

        BuildTable();
    })

}


function BuildTable() {
    var table = $('#table-body')

    var data = Pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet;
    head.style.display = 'block';
    console.log(myList);
    console.log('hello world');
    for (var i = 1 in myList) {
        //Keep in mind we are using "Template Litterals to create rows"
        console.log('hello world');
        var row = `<tr class="change-font">
                  <td >${myList[i].currency}</td>
                  
                  <td >${myList[i].name}</td>
                  <td >${myList[i].symbol}</td>
                  <td >${myList[i].type}</td>
                  `
        table.append(row)
    }

    pageButtons(data.pages)
}