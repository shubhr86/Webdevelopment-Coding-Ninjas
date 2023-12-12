import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

// Define a virtual getter for IST-formatted timestamp
postSchema.virtual('CreatedAt').get(function () {
    return this.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  });
  
  // Define a virtual getter for IST-formatted updatedAt timestamp
  postSchema.virtual('UpdatedAt').get(function () {
    return this.updatedAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  });
  
  // Apply the virtual getters to JSON representations of the model
  postSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
      ret.createdAtIST = doc.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      ret.updatedAtIST = doc.updatedAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret._id;
      delete ret.__v;
    },
  });
  
  // Apply the virtual getters to Object representations of the model
  postSchema.set('toObject', {
    virtuals: true,
    transform: function (doc, ret) {
      ret.createdAtIST = doc.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      ret.updatedAtIST = doc.updatedAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret._id;
      delete ret.__v;
    },
  });