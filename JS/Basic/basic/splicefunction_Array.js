 var arr=[2,3,4,5,6];
 // delete the first index and elements
 arr.splice(1,1);
 console.log(arr);
 // insert with splice
 console.log("after insert");
 // don't want to delete anything then specify it zero

 arr.splice(2,0,10);
 console.log(arr);
