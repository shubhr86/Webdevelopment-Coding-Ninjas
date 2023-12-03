import mongoose from 'mongoose';

export const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    // Include the reviews field properly
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }]
});
