import express from "express";
import CommentController from "../controller/comment.controller.js";
import jwtAuth from "../../../middleware/jwt.middleware.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get("/:id", jwtAuth, commentController.getAllCommentsForPost);
commentRouter.post("/:id", jwtAuth, commentController.createComment);

commentRouter.put("/:id", jwtAuth, commentController.updateComment);
commentRouter.delete("/:id", jwtAuth, commentController.deleteComment);

export default commentRouter;
