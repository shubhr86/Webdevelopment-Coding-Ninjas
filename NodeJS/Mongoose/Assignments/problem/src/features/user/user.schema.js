import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Validation error: Name is required'],
        minlength: [3, 'Validation error: Name should be at least 3 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Validation error: Email is required'],
        unique: true,
        match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Validation error: Invalid email format' ],
    },
    mobile: {
        type: String,
        required: [true, 'Validation error: Mobile number is required'],
        unique: true,
    },
    age: {
        type: Number,
        required: [true, 'Validation error: Age is required'],
        min: [0, 'Validation error: Age must be at least 0'],
        max: [100, 'Validation error: Age must be at most 100'],
    },
    password: {
        type: String,
        required: [true, 'Validation error: Password is required'],
    },
    type: {
        type: String,
        required: [true, 'Validation error: Type is required'],
        enum: {
            values: ['student', 'fresher', 'experienced'],
            message: 'Validation error: Type must be one of [student, fresher, experienced]',
        },
    },
});
