import { addComment, getCommentsByPostId, updateComment, deleteComment } from './comment.repository.js';
import { customErrorHandler } from '../../middlewares/errorHandler.js';

export const addCommentHandler = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const commentData = { user: req._id, content };
  
      const resp = await addComment(postId, commentData);
  
      if (resp.success) {
        res.status(201).json({
          success: true,
          msg: 'Comment added successfully',
          res: resp.res,
        });
      } else {
        console.error('Error:', resp.error.msg);
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      next(new customErrorHandler(500, 'Internal Server Error'));
    }
  };

export const getCommentsHandler = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const resp = await getCommentsByPostId(postId);

    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: 'Comments retrieved successfully',
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    console.error('Unexpected Error:', error);
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const updateCommentHandler = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
  
      const resp = await updateComment(commentId, content);
  
      if (resp.success) {
        res.status(200).json({
          success: true,
          msg: 'Comment updated successfully',
          res: resp.res,
        });
      } else {
        console.error('Error:', resp.error.msg);
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      next(new customErrorHandler(500, 'Internal Server Error'));
    }
  };
  
  export const deleteCommentHandler = async (req, res, next) => {
    try {
      const {commentId } = req.params;
  
      const resp = await deleteComment( commentId);
  
      if (resp.success) {
        res.status(200).json({
          success: true,
          msg: 'Comment deleted successfully',
          res: resp.res,
        });
      } else {
        console.error('Error:', resp.error.msg);
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      next(new customErrorHandler(500, 'Internal Server Error'));
    }
  };