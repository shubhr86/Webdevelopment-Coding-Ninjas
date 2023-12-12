// friendship.repository.js
import mongoose from 'mongoose';
import { friendshipSchema } from './friendship.schema.js';
import { customErrorHandler } from '../../middlewares/errorHandler.js';


 const FriendshipModel = mongoose.model('Friendship', friendshipSchema);

export const getFriends = async (userId) => {
  try {
    const friends = await FriendshipModel.find({
      user: userId,
      status: 'accepted',
    }).populate('friend', 'name email'); // Assuming you have 'name' and 'email' fields in the User model

    return { success: true, res: friends };
  } catch (error) {
    console.error('Database Query Error:', error);
    return { success: false, error: { statusCode: 500, msg: 'Internal Server Error' } };
  }
};

export const getPendingRequests = async (userId) => {
  try {
    const pendingRequests = await FriendshipModel.find({
      friend: userId,
      status: 'pending',
    }).populate('user', 'name email');

    return { success: true, res: pendingRequests };
  } catch (error) {
    console.error('Database Query Error:', error);
    return { success: false, error: { statusCode: 500, msg: 'Internal Server Error' } };
  }
};

export const toggleFriendship = async (userId, friendId) => {
  try {
    const existingFriendship = await FriendshipModel.findOne({
      $or: [
        { user: userId, friend: friendId },
        { user: friendId, friend: userId },
      ],
    });

    if (existingFriendship) {
      // Toggle friendship status
      existingFriendship.status =
        existingFriendship.status === 'pending' ? 'accepted' : 'pending';
      await existingFriendship.save();
    } else {
      // Create a new friendship
      const newFriendship = new FriendshipModel({ user: userId, friend: friendId });
      await newFriendship.save();
    }

    return { success: true, msg: 'Friendship status toggled successfully.' };
  } catch (error) {
    console.error('Database Query Error:', error);
    return { success: false, error: { statusCode: 500, msg: 'Internal Server Error' } };
  }
};

export const respondToRequest = async (userId, friendId, accept) => {
  try {
    const request = await FriendshipModel.findOne({
      user: friendId,
      friend: userId,
      status: 'pending',
    });

    if (!request) {
      return { success: false, error: { statusCode: 404, msg: 'Friend request not found.' } };
    }

    if (accept) {
      request.status = 'accepted';
      await request.save();
    } else {
      await request.remove();
    }

    return { success: true, msg: 'Friend request response processed successfully.' };
  } catch (error) {
    console.error('Database Query Error:', error);
    return { success: false, error: { statusCode: 500, msg: 'Internal Server Error' } };
  }
};
