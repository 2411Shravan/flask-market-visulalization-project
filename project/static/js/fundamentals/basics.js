const requiredDataBasics=document.getElementById('getbasics');
// const lol= document.getElementById('lol');
// const loaf=document.getElementById('loafing');

requiredDataBasics.addEventListener('submit',function (e){
    
    e.preventDefault();
    console.log('hello world');
    
    var UI=document.getElementById('comp').value;
    
    console.log(UI);
    
})