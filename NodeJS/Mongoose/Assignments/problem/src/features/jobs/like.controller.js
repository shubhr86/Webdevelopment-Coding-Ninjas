import mongoose from 'mongoose';
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { likeRepo,getLikesRepo } from './like.repository.js';

export const like = async (req, res, next) => {
  const { model, id } = req.query;
  const userId = req._id;

  try {
    const { success, like, error } = await likeRepo(userId, id, model);

    if (success) {
      res.status(200).json({
        success: true,
        msg: "Job liked successfully",
        resp: like,
      });
    } else {
      next(new customErrorHandler(error.statusCode, error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const getLikes = async (req, res, next) => {
  const { id, model } = req.query;

  try {
    const { success, likes, error } = await getLikesRepo(id, model);
    console.log(success)

    if (success) {
      // Modify the success response to match the desired format
      const user = req.user || {};  // Use an empty object if user details are not available
      const likeable = likes.length > 0 ? likes[0].likeable : null;

      res.status(200).json({
        success: true,
        resp: {
          user: {
            name: user.name || '',
            email: user.email || '',
            mobile: user.mobile || '',
            age: user.age || 0,
            type: user.type || '',
            _id: user._id || '',
          },
          likeable: likeable,
        },
      });
    } else {
      next(new customErrorHandler(error.statusCode, error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};