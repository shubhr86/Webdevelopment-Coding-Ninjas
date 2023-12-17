// Complete the server.js file to make user's add, delete and update the todos.
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import {connectToDatabase} from './db.config.js';
import Task from './task.schema.js';

export const app = express();
app.use(cors());

export const server= http.createServer(app);

const io= new Server(server,{
    cors:{
        origin:'*',
        methods: ["GET","POST"]
    }
})
connectToDatabase();

io.on("connection", (socket) =>{
    console.log("connection mode.");
    Task.find({})
    .then(tasks => {
        socket.emit("initializeTasks", tasks);
    })
    .catch(err => {
        console.error(err);
    });


    // Listen for "addTask" event
    socket.on("addTask", (taskText) => {
        // Create a new task
        const newTask = new Task({
            text: taskText
        });

        // Save the task to the database
        newTask.save()
        .then(savedTask => {
            // Emit the new task to all connected clients
            io.emit("addTask", savedTask);
        })
        .catch(err => {
            console.error(err);
        });
    
    });

    // Listen for "deleteTask" event
    socket.on("deleteTask", (taskId) => {
        // Delete the task from the database
        Task.findByIdAndDelete(taskId)
    .then(deletedTask => {
        // Emit the deleted task ID to all connected clients
        io.emit("deleteTask", deletedTask._id);
    })
    .catch(err => {
        console.error(err);
    });

    });

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });

})
