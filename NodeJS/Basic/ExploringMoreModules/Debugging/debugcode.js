const char=[
    {name: "daenerys", age :23},
    {name: "sansa", age :21},
    {name: "arya", age :16},
];

let ans = Number.MAX_VALUE;
char.forEach((charector) =>{
    if (charector.age < ans) ans = charector.age;
});

console.log(ans);