// comment.repository.js
import mongoose from 'mongoose';
import { commentSchema } from './comment.schema.js';
import { postSchema } from '../post/post.schema.js';

const CommentModel = mongoose.model('Comment', commentSchema);

const PostModel = mongoose.model('Post', postSchema);

// export const addComment = async (commentData) => {
//   try {
//     const comment = new CommentModel(commentData);
//     const savedComment = await comment.save();
//     return { success: true, res: savedComment };
//   } catch (error) {
//     return {
//       success: false,
//       error: { statusCode: 400, msg: error.message || 'Invalid comment data' },
//     };
//   }
// };

export const addComment= async (postId, commentData) => {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $push: { comments: commentData } },
        { new: true }
      );
  
      if (!updatedPost) {
        return {
          success: false,
          error: { statusCode: 404, msg: 'Post not found.' },
        };
      }
  
      return { success: true, res: updatedPost.comments };
    } catch (error) {
      console.error('Database Query Error:', error);
      return {
        success: false,
        error: { statusCode: 500, msg: 'Internal Server Error' },
      };
    }
  };

export const getCommentsByPostId = async (postId) => {
  try {
    const comments = await CommentModel.find({ post: postId });
    return { success: true, res: comments };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: 'Internal Server Error' },
    };
  }
};

export const updateComment = async (commentId, content) => {
    try {
      const updatedPost = await PostModel.findOneAndUpdate(
        {'comments._id': commentId },
        { $set: { 'comments.$.content': content } },
        { new: true }
      );
  
      if (!updatedPost) {
        return {
          success: false,
          error: { statusCode: 404, msg: 'Post or Comment not found.' },
        };
      }
  
      return { success: true, res: updatedPost.comments };
    } catch (error) {
      console.error('Database Query Error:', error);
      return {
        success: false,
        error: { statusCode: 500, msg: 'Internal Server Error' },
      };
    }
  };
  
  export const deleteComment = async (commentId) => {
    try {
      // Fetch the postId associated with the commentId
      const post = await PostModel.findOne({ 'comments._id': commentId });
      
      if (!post) {
        return {
          success: false,
          error: { statusCode: 404, msg: 'Post or Comment not found.' },
        };
      }
  
      const updatedPost = await PostModel.findByIdAndUpdate(
        post._id,
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
  
      return { success: true, res: updatedPost.comments };
    } catch (error) {
      console.error('Database Query Error:', error);
      return {
        success: false,
        error: { statusCode: 500, msg: 'Internal Server Error' },
      };
    }
  };