import mongoose from 'mongoose';
import { postSchema } from './post.schema.js';

const PostModel = mongoose.model('Post', postSchema);

export const createPost = async (postData) => {
  try {
    const post = new PostModel(postData);
    const savedPost = await post.save();
    return { success: true, res: savedPost };
  } catch (error) {
    
    return {
      success: false,
      error: { statusCode: 400, msg: error.message || 'Invalid post data' },
    };
  }
};

export const getOnePost = async (postId) => {
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return { success: false, error: { statusCode: 404, msg: 'Post not found' } };
    }
    return { success: true, res: post };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: 'Internal Server Error' },
    };
  }
};

export const getPostsByUser = async (userId) => {
  try {
    const posts = await PostModel.find({ user: userId });
    return { success: true, res: posts };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: 'Internal Server Error' },
    };
  }
};

export const getAllPosts = async () => {
    try {
      const posts = await PostModel.find();
     // console.log('posts:', posts);
      return posts;
    } catch (error) {
        return { success: false, error: { statusCode: 404, msg: 'Post not found' } };
    }
  };

export const deletePost = async (postId) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return { success: false, error: { statusCode: 404, msg: 'Post not found' } };
    }
    return { success: true, res: deletedPost };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: 'Internal Server Error' },
    };
  }
};

export const updatePost = async (postId, updatedData) => {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $set: updatedData },
        { new: true } // Return the modified document
      );
  
      if (!updatedPost) {
        throw new customErrorHandler(404, 'Post not found.');
      }
  
      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      throw new customErrorHandler(500, 'Internal Server Error');
    }
  };
