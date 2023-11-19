// like.routes.js

import express from 'express';
import LikeController from '../controller/like.controller.js';
import jwtAuth from '../../../middleware/jwt.middleware.js';

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get('/:postId', jwtAuth, likeController.getAllLikesForPost);

likeRouter.get('/toggle/:postId', jwtAuth, likeController.toggleLikeForPost);

likeRouter.post("/:postId",jwtAuth, likeController.addLike);
likeRouter.delete("/:postId", jwtAuth,likeController.removeLike);

export default likeRouter;
