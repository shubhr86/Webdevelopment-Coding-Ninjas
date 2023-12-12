import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';
import bcrypt from 'bcrypt';

const UserModel = mongoose.model('User', userSchema);

export const createUser = async (userData) => {
  try {
    const user = new UserModel(userData);
    const savedUser = await user.save();
    return { success: true, res: savedUser };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error.message || 'Invalid user data' },
    };
  }
  };
  export const userLoginRepo = async (userData) => {
    try {
      const { email, password } = userData;
      const user = await UserModel.findOne({ email });
  
     // console.log('Found user:', user);
  
      if (!user) {
        return { success: false, error: { statusCode: 401, msg: 'Login failed. User not found.' } };
      }
  
      const isPasswordMatch = await compareHashedPassword(password, user.password);
  
      //console.log('Is password match:', isPasswordMatch);
  
      if (!isPasswordMatch) {
        return { success: false, error: { statusCode: 401, msg: 'Invalid credentials.' } };
      }
  
      return { success: true, res: user };
    } catch (error) {
     // console.error('Login error:', error);
      return { success: false, error: { statusCode: 500, msg: 'Login failed. Please try again later.' } };
    }
  };
  
  
  const compareHashedPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };

  export const logoutUser = async (userId, tokenToRemove) => {
    try {
      const user = await UserModel.findOne({ _id: userId });
     //
      console.log('User:', user);

      if (!user) {
        return {
          success: false,
          error: { statusCode: 404, msg: 'User not found.' },
        };
      }
      console.log('Tokens before removal:', user.tokens);

      user.tokens = user.tokens.filter((token) => token.token !== tokenToRemove);
      await user.save();
      console.log('Tokens after removal:', user.tokens);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: { statusCode: 500, msg: 'Logout failed. Please try again later.' },
      };
    }
  };
  
  export const logoutAllDevices = async (userId) => {
    try {
      const user = await UserModel.findOne({ _id: userId });
  
      if (!user) {
        return {
          success: false,
          error: { statusCode: 404, msg: 'User not found.' },
        };
      }
  
      user.tokens = [];
      await user.save();
  
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: { statusCode: 500, msg: 'Logout failed. Please try again later.' },
      };
    }
  };
  
  export const getUserDetails = async (userId) => {
    try {
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return {
          success: false,
          error: { statusCode: 404, msg: 'User not found.' },
        };
      }
  
      return { success: true, res: user };
    } catch (error) {
      return {
        success: false,
        error: { statusCode: 500, msg: 'Failed to retrieve user details.' },
      };
    }
  };
  
  export const getAllUserDetails = async () => {
    try {
      const users = await UserModel.find({}, { password: 0, tokens: 0 });
  
      return { success: true, res: users };
    } catch (error) {
      return {
        success: false,
        error: { statusCode: 500, msg: 'Failed to retrieve all user details.' },
      };
    }
  };
  
  export const updateUserDetails = async (userId, updates) => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedUser) {
        return {
          success: false,
          error: { statusCode: 404, msg: 'User not found.' },
        };
      }
  
      return { success: true, res: updatedUser };
    } catch (error) {
      return {
        success: false,
        error: { statusCode: 400, msg: 'Invalid user data.' },
      };
    }
  };