const roller = document.getElementById('roller');
const arr_alldata=[];
async function getAllStock(){
    roller.style.display='block';
    console.log('hello world');
    var api ="https://api.twelvedata.com/stocks?source=docs";
    const response = await fetch(api);
    const datas = await response.json();
   console.log(datas);
   //console.log(datas.length);
    getAllData(datas);
    
}


  function getAllData(ans){
    // ans.forEach(dat=>{
    //     console.log(dat);
    // });
//    console.log(ans);
    const{data}=ans;
    for(var i=0;i<data.length;i++){
        var obj={};
        obj['currency']=data[i].currency;
        obj['name']=data[i].name;
        obj['symbol']=data[i].symbol;
        obj['type']=data[i].type;
    
        // console.log(data[i]);
        arr_alldata.push(obj);
    }
  
console.log(arr_alldata.length);
buildTable();
roller.style.display='none';
}

var state = {
    'querySet': arr_alldata,

    'page': 1,
    'rows': 10,
    'window': 5,
}



function pagination(querySet, page, rows) {

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
    var wrapper = document.getElementById('Pagination-Wrapper')

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
        $('#Table-Body').empty()

        state.page = Number($(this).val())

        buildTable()
    })

}


function buildTable() {
    var table = $('#Table-Body')

    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet

    for (var i = 1 in myList) {
        //Keep in mind we are using "Template Litterals to create rows"
        var row = `<tr>
                  <td>${myList[i].currency}</td>
                  <td>${myList[i].name}</td>
                  <td>${myList[i].symbol}</td>
                  <td>${myList[i].type}</td>
                  `
        table.append(row)
    }

    pageButtons(data.pages)
}




function showAllData(datas){
    for(var i=0;i<datas.length;i++){
        var obj={};
        obj['name']=datas[i].country;
        obj['currency']=datas[i].currency;
        obj['name']=datas[i].name;
        obj['symbol']=datas[i].symbol;
        obj['equity']=datas[i].equity;

        arr_alldata.push(obj);
    }


    console.log(arr_alldata);
    // roller.style.display='none';
}

