import dotenv from 'dotenv';
dotenv.config();
import server from './server.js';
// Mongodb 
import connectUsingMongoose from './src/server/db.config.js';

// Listening server.
server.listen('3000', ()=>{
    console.log("Server is listening on localhost:3000.");
    // Connecting to the Mongodb here.
    connectUsingMongoose();
})