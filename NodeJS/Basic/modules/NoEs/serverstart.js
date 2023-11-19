const http= require('http')

const fs= require('fs')


const server = http.createServer((req, res)=>{
    const fileContent=fs.readFileSync('demo1.html').toString;
   res.end(fileContent)
});

server.listen(80)
    console.log("server working");