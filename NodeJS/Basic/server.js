// creating server

// 1. Import http library/ module

const http= require('http');

// 2. Create Server.

const server = http.createServer((req, res) =>{
    // Here comes the request.
    res.end('Welcome to the NodeJS server');
});

// 3. unique PORT number
server.listen(3100, ()=>{
    console.log("Sever is okay");
});

