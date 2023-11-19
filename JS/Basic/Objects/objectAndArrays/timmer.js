function sayHello(){
    console.log("Hello");
}
// time in MiliSececonds
// it exectue for 1 time only

setTimeout(sayHello, 1000);

// if want to repeat after interval
console.log("multi calls");

var id= setInterval(sayHello,1000);

// to stop
clearInterval(id,5000);

