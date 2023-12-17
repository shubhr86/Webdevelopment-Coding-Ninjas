// don't change the prewritten code
// change the code for 'join' event

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { messageModel } from './message.schema.js';

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connection made.");

    socket.on("join", async (data) => {
        io.to(data.room).emit("message", {
            username: 'Server',
            text: `Welcome to the ${data.room} room, ${data.username}`
        });

        // Retrieve previous messages based on timestamp range (e.g., messages from the last 24 hours)
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        const previousMessages = await messageModel
            .find({ room: data.room, createdAt: { $gte: twentyFourHoursAgo } })
            .sort({ createdAt: 1 });

        // Emit previous messages to the user who joined
        socket.emit("previousMessages", previousMessages.map(msg => ({
            username: msg.username,
            text: msg.text
        })));

    });

    socket.on("sendMessage", async (data) => {

        const message = new messageModel({
            username: data.username,
            text: data.message,
            room: data.room
        })

        await message.save();

        // Broadcast the received message to all users in the same room
        io.to(data.room).emit("message", {
            username: data.username,
            text: data.message
        });
    });

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});


