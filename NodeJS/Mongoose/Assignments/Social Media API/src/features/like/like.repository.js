import mongoose from 'mongoose';
import { likeSchema } from './like.schema.js';

const LikeModel = mongoose.model('Like', likeSchema);

export const toggleLike = async (id, type) => {
    try {
      const userId = id  
      //console.log(userId)
      let postId, commentId;
  
      if (type === 'Post') {
        postId = id; // For a post, id is the post's ID
      } else if (type === 'Comment') {
        commentId = id; // For a comment, id is the comment's ID
      } else {
        throw new customErrorHandler(400, 'Invalid like type.');
      }
  
      const existingLike = await LikeModel.findOne({ user: userId, post: postId, comment: commentId });
  
      if (existingLike) {
        // Remove like if it already exists
        await LikeModel.findByIdAndDelete(existingLike._id);
        return { success: true, msg: `Like removed successfully for ${type.toLowerCase()}.` };
      } else {
        // Create a new like
        const newLike = new LikeModel({ user: userId, post: postId, comment: commentId });
        await newLike.save();
        return { success: true, msg: `Like added successfully for ${type.toLowerCase()}.` };
      }
    } catch (error) {
      console.error('Database Query Error:', error);
      return { success: false, error: { statusCode: 500, msg: 'Internal Server Error' } };
    }
  };
  
  export const getLike = async (likeId) => {
    try {
      const like = await LikeModel.findById(likeId);
      return { success: true, res: like };
    } catch (error) {
      console.error('Database Query Error:', error);
      return { success: false, error: { statusCode: 500, msg: 'Internal Server Error' } };
    }
  };