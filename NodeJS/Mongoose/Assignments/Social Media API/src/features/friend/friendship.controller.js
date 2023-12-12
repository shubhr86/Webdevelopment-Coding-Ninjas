// friendship.controller.js
import { getFriends, getPendingRequests, toggleFriendship, respondToRequest } from './friendship.repository.js';
import { customErrorHandler } from '../../middlewares/errorHandler.js';


export const getFriendsHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await getFriends(userId);

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

export const getPendingRequestsHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await getPendingRequests(userId);

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

export const toggleFriendshipHandler = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    const userId = req._id;
    const result = await toggleFriendship(userId, friendId);

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

export const respondToRequestHandler = async (req, res, next) => {
    try {
      const { friendId } = req.params;
      const userId = req._id; 
  
      const accept = req.query.accept !== 'false';
        
      //console.log(friendId, userId,accept);
      const result = await respondToRequest(userId, friendId, accept);
  
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
