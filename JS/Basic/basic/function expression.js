var factorial = function fact(n){
    var ans =1;
    for (var i=1; i<=n; i++){
        ans =ans*i;
    }
    return ans;
}
console.log(factorial(5));