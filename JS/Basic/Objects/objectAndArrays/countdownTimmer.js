var count =10;
function timer(){
    console.log(count);
    count--;
    if (count===0){
        console.log(0);
        clearInterval(timmer);
    }
}

var timmer= setInterval( timer,1000);