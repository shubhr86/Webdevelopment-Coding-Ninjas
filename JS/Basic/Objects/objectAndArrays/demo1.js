var arr= [20,30,40,50];
//array is type of object and stored like object with some extra property like length

var obj={
    "0":20,
    "1":30,
    "2":40,
    "3":50
}
// itterating over Keys
for (var i in arr){
    console.log(i);
}