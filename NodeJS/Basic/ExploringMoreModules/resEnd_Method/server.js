const http= require ('http');


const server =http.createServer((req,res)=>{
    res.write( // its not end response
        'This is comming from NodeJs Server.'
    );

    if (req.url=='/first'){
        return res.end('This is first resposne');
    }else {
        res.end('This is default');
    }
})
server.listen(32,(req,res) =>{
    console.log('Server Start');
});