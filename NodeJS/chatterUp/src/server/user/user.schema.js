import mongoose from "mongoose";

const chatsScehma = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    avatar: {
        type: String
    }
});

const ChatModel = mongoose.model('Chats', chatsScehma);
export default ChatModel;