import mongoose from 'mongoose';

export const likeSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    on_model:{
        type:String,
        enum: ['User', 'Job'],
        required:true,

    }
    
});