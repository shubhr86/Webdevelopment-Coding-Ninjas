// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from 'mongoose';

import { likeSchema } from "./like.schema.js";

const LikeModel = mongoose.model('Like', likeSchema);
import { customErrorHandler } from '../../middlewares/errorHandler.js';

export const likeRepo = async (user_id, job_id, model) => {
  
  try {
    const like = new LikeModel({ user: user_id, likeable: job_id, on_model: model });
    const savedLike = await like.save();
    return savedLike;
  } catch (error) {
    throw new customErrorHandler(400, error.message);
  }

};
export const getLikesRepo = async (id, on_model) => {
  try {
    const likes = await LikeModel.find({ likeable: id, on_model: on_model });
    return likes;
  } catch (error) {
    throw new customErrorHandler(400, error.message);
  }
};
