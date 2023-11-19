//  Use Strict Mode to see mistakes

"use strict";


// using function for reuse

function sayHello() {
    alert('hello');
}

var hellobutton = document.getElementById('btn');
hellobutton.addEventListener('click',sayHello );

//  count function

var clickcount =document.getElementById('click-count');
var box = document.getElementById('one');
  var count =0;

box.addEventListener('click', function(){
    count++;
    console.log(count);
    clickcount.innerText=count + " ";

});
