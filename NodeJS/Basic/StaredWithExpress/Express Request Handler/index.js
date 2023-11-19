// Please don't change the pre-written code

const express = require("express");
const server = express();

// Write your code here

server.get("/",(req,res) =>{
    res.send('get');
})
server.post("/",(req,res) =>{
    res.send('post');
})
server.delete("/",(req,res) =>{
    res.send('delete');
})
server.put("/",(req,res) =>{
    res.send('put');
})



module.exports = server;
