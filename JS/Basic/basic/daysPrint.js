var arrDays=[monday, tudesday,wednesday,thursday,friday,staurday,sunday];
var n=1;
function returnDay(){
  
    for (var i=1; i<arrDays.length; i++){
        if (n===1){
            return console.log(arrDays[0]);
        }
         if (n===2){
            return console.log(arrDays[1]);
        }
          if (n===3){
            return console.log(arrDays[2]);
        }
          if (n===4){
            return console.log(arrDays[3]);
        }  if (n===5){
            return arrDays[4];
        }  if (n===6){
            return arrDays[5];
        }  if (n===7){
            return arrDays[6];
        }
        
    }

}
