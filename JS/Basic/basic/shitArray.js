function rotateLeft(arr){
    var firstElement= arr.shift();
    arr.push(firstElement);
    return arr;
}
console.log(rotateLeft([1,2,4,5]));