// creating server

// 1. Import http library/ module

const http= require('http');

// 2. Create Server.

const server = http.createServer((req, res) =>{
    
    console.log(req.url);
    // if don't want to end server response
    // use " .write "keyword.
    res.write('Welcome to my app');

    // Handle multiple requests / URLs

    if (req.url == '/product'){
        res.end('This is product page');
    }else if (req.url == '/user'){
        res.end('This is user page');
    }
    
    // Here comes the request.
    res.end('Welcome to the NodeJS server');
});

// 3. unique PORT number
server.listen(3100, ()=>{
    console.log("Sever is okay");
});
