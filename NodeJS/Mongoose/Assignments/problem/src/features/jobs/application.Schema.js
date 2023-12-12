import mongoose from 'mongoose';

export const applicatonSchema = new mongoose.Schema({
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
})