import mongoose from 'mongoose';

import { jobSchema } from "./job.schema.js";
import { applicatonSchema } from "./application.Schema.js";
import { likeSchema } from "./like.Schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

const JobModel = mongoose.model("Job", jobSchema);

const ApplicationModel= mongoose.model('Application',applicatonSchema);

const likeModel= mongoose.model('Like',likeSchema);

export const likeRepo = async (userId, likeableId, onModel) => {
  try {
    const like = new likeModel({ user: userId, likeable: likeableId, on_model: onModel });
    const savedLike = await like.save();

    // Retrieve the details of the likeable object
    const likeable = await likeModel.findById(likeableId).populate('likeable');

    return {
      success: true,
      like: savedLike,
      likeable: likeable,
    };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: 'Internal Server Error' },
    };
  }
};
  
  export const getLikesRepo = async (likeableId, onModel) => {
    try {
      const likes = await likeModel.find({ likeable: likeableId, on_model: onModel });
      return { success: true, likes };
    } catch (error) {
      console.error('Error in getLikesRepo:', error);
      return {
        success: false,
        error: { statusCode: 500, msg: 'Internal Server Error' },
      };
    }
  };