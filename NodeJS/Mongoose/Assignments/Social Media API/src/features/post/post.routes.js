import express from 'express';
import { addPost, getOnePostHandler, getPostsByUserHandler, getAllPostsHandler, deletePostHandler, updatePostHandler } from './post.controller.js';
import uploadMiddleware from '../../middlewares/upload.js';
import { auth } from '../../middlewares/jwtAuth.js';
const router = express.Router();


router.route('/all',).get(getAllPostsHandler);

router.route('/').post(auth,uploadMiddleware.single('imageUrl'), addPost);
router.route('/:postId',).put(auth,updatePostHandler);
router.route('/:postId').get(auth,getOnePostHandler);
router.route('/').get(auth,getPostsByUserHandler);

router.route('/:postId').delete(auth,deletePostHandler);

export default router;
