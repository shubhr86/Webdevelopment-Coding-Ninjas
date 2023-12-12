import express from 'express';
import {
  addCommentHandler,
  getCommentsHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from './comment.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';

const router = express.Router();

router.route('/:postId').post(auth,addCommentHandler);
router.route('/:postId').get( auth,getCommentsHandler);
router.route('/:commentId' ).put(auth, updateCommentHandler);
router.route('/:commentId').delete (auth,deleteCommentHandler);

export default router;
