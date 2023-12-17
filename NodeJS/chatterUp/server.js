import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import ChatModel from '../chatterUp/src/server/user/user.schema.js';

const app = express();

// Create server using http.
const server = http.createServer(app);

// Create server using socket.io.
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let usersCount = 0;
const users = [];

// Use socket events.
io.on('connection', (socket)=>{
    console.log("Connection established.");

    // Sending chat history to user when user joins and handling user counts and users.
    socket.on("user-joined", async (username)=>{
        // Updating users and broadcasting users.
        usersCount++;
        const newUser = {username, socketId: socket.id};
        users.push(newUser);
        console.log(`${username.username} joined`);
        io.emit('user-joined', (`${username.username}`));

        // Emitting the users array for the newly joined user.
        io.emit('users-list', users.map(user => user.username));

        // Fetaching chats from the database.
        const chats =  await ChatModel.find().sort({createdAt : 1});
        // Emitting chat history event to client.html.
        socket.emit('chat-history', chats);

        // Broadcasting the updated user count to all users
        io.emit('users-count', usersCount);

        


        // Disconnecting socket server.
        socket.on('disconnect', ()=>{
            console.log("User disconnected.");

            // Decrement when user left the room.
            usersCount--;

            // Emiting updated user count to all users.
            io.emit("users-count", usersCount);

            // Remove the disconnected user from the list
            const disconnectedSocketId = socket.id;
            const index = users.findIndex((user)=> user.socketId === disconnectedSocketId);
            if(index !== -1)
            {
                const disconnectedUser = users.splice(index, 1)[0];
                io.emit('users-list', users.map(user => user.username));
                console.log(`${username.username} disconnected`);
            }
        });
    });

    // Bradcasting user typing to everyone;
    socket.on('user-typing', (username)=>{
        io.emit('user-typing', username);
    });
    

    // Adding chats to the database and broadcasting messages.
    socket.on("new-message", async (userMessage)=>{
        try {
            const newMessage = new ChatModel({
                user: userMessage.user,
                message: userMessage.message,
                createdAt: new Date().toUTCString(),
                avatar: userMessage.avatar
            });
            await newMessage.save();

            // Broadcasting messages.
            socket.broadcast.emit('broadcast-messages', newMessage);

            socket.emit('new-message-received');
        } catch (error) {
            console.log(error);
        }
    })

    
});


export default server;