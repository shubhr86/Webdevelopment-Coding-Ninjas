const http = require('http');

const server = http.createServer((req,res) =>{
   // checking Method
    if (req.method =='POST'){
        let body=''
        req.on('data',(chunk) => {
            body+=chunk.toString()
        })
        req.on('end',() =>{
            console.log(body);
            res.end('Data is Received');
        });
    }else {
        res.end('This is my server');
    }
   
});

server.listen(31);
console.log('server working Fine');