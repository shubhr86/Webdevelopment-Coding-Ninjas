// Please don't change the pre-written code
// Import the necessary modules here
// Write your code here
const express= require('express');

// create server

const server= express();

//handle request

server.get("/",(req,res) =>{
    res.send("Be a Coding Ninja.");
});


module.exports = { server };
