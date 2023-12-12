import { createPost, getOnePost, getPostsByUser, getAllPosts, deletePost, updatePost } from './post.repository.js';
import { customErrorHandler } from '../../middlewares/errorHandler.js';

export const addPost = async (req, res, next) => {
  try {
    const userId = req._id; // user ID available
    const { caption } = req.body;

    const postData = {
      user: userId,
      imageUrl: req.file.path,
      caption,
    };
    //console.log('postData',postData)

    const resp = await createPost(postData);

    if (resp.success) {
      res.status(201).json({
        success: true,
        msg: 'Post created successfully',
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const getOnePostHandler = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const resp = await getOnePost(postId);

    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: 'Post retrieved successfully',
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const getPostsByUserHandler = async (req, res, next) => {
  try {
    const userId =  req._id; // user ID available
    const resp = await getPostsByUser(userId);

    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: 'Posts retrieved successfully',
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const getAllPostsHandler = async (req, res, next) => {
    try {
      const posts = await getAllPosts();
  
      res.status(200).json({
        success: true,
        msg: 'All posts retrieved successfully',
        res: posts,
      });
    } catch (error) {
      //console.error('Error:', error);
      next(new customErrorHandler(500, 'Internal Server Error'));
    }
  };

export const deletePostHandler = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const resp = await deletePost(postId);

    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: 'Post deleted successfully',
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const updatePostHandler = async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const updatedData = (req.body);
      

      const updatedPost = await updatePost(postId, updatedData);
  
      res.status(200).json({
        success: true,
        msg: 'Post updated successfully',
        res: updatedPost,
      });
    } catch (error) {
      console.error('Error:', error);
      next(error);
    }
  };
