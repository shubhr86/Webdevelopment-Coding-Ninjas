import { toggleLike , getLike } from './like.repository.js';
import { customErrorHandler } from '../../middlewares/errorHandler.js';

export const toggleLikeHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { type } = req.query;
  
      const result = await toggleLike(id, type);
  
      if (result.success) {
        res.status(200).json({ success: true, msg: result.msg });
      } else {
        next(new customErrorHandler(result.error.statusCode, result.error.msg));
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      next(new customErrorHandler(500, 'Internal Server Error'));
    }
  };
  
  export const getLikeHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
     // console.log( "id",id);
      const result = await getLike(id);
  
      if (result.success) {
        res.status(200).json({ success: true, res: result.res });
      } else {
        next(new customErrorHandler(result.error.statusCode, result.error.msg));
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      next(new customErrorHandler(500, 'Internal Server Error'));
    }
  };