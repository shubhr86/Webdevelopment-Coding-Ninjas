// friendship.routes.js
import express from 'express';
import {
  getFriendsHandler,
  getPendingRequestsHandler,
  toggleFriendshipHandler,
  respondToRequestHandler,
} from './friendship.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';

const router = express.Router();

router.route('/get-friends/:userId').get(auth,getFriendsHandler);
router.route('/get-pending-requests/:userId').get(auth,getPendingRequestsHandler);
router.route('/toggle-friendship/:friendId').get(auth,toggleFriendshipHandler);
router.route('/response-to-request/:friendId').get(auth,respondToRequestHandler);

export default router;
