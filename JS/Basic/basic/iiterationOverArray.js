var arr=[2,3,4,5,6,7];

// simple way

// for (var i=0; i<=arr.length; i++){
//     console.log(arr[i]);
// }

// other way- For Each

function print(element){
    console.log(element);
}
arr.forEach(print);