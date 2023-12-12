import express from 'express';
import { toggleLikeHandler, getLikeHandler } from './like.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';
const router = express.Router();

router.route('/toggle/:id').get(auth,toggleLikeHandler);
router.route('/:id').get(auth,getLikeHandler);

export default router;