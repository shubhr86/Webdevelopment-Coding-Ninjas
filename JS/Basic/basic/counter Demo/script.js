var current = document.querySelector('.current');
var next = document.querySelector('.next');
let x=1;
let start= true;
let interval =0;
let count =0;
let inputNum= document.getElementById('number');
let button=document.getElementById('button');

function startCounter(){
    count=parseInt(inputNum.value);

    if ((count >=1 && count <10) && start === true){
        start=false; x=1;
        interval = setInterval(animated, 1000);
    }else {
        next.innerHTML=1;
        x=1;
    }
   

}
function animated(interval){
    if (x <=count){
        next.innerHTML=x;
        next.classList.add('animated');
        setTimeout(function(){
            current.innerHTML=x;
            next.classList.remove('animated');
            x++;
        },500);
    }else{
        clearInterval(interval);
    }
   
  
}