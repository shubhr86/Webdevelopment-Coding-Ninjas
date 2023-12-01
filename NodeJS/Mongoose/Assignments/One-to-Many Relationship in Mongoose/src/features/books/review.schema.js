// Please don't change the pre-written code
// Import the necessary modules here(if required)

import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
  // Write your code here
  text: String,

  book:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Book'
  },
  rating: {
    type: Number,
    required: [true, 'Validation error: rating is required'],
    min: [1, 'Validation error: rating cannnot be lower than 1'],
    max: [5, 'Validation error: rating cannnot be higher than 5'],
  },

});
