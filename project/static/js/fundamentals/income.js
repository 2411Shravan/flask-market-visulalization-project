const requiredIncome=document.getElementById('getIncomeSt');
// const lol= document.getElementById('lol');
// const loaf=document.getElementById('loafing');

requiredIncome.addEventListener('submit',function (e){
    
    e.preventDefault();
    console.log('hello world');
    
    var UI=document.getElementById('compa').value;
    var res=UI.toUpperCase();
    console.log(res);
    getBasicFinData(res);
})
