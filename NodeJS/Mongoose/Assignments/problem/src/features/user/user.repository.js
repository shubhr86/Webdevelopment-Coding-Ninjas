// Please don't change the pre-written code
// Import the necessary modules here


import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {userSchema} from "./user.schema.js";
import { compareHashedPassword, hashPassword } from '../../utils/hashPassword.js';

const UserModel = mongoose.model('User', userSchema);

export const userRegisterationRepo = async (userData) => {
  // Write your code here
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
  // Write your code here
  try {
    const { email, password } = userData;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return { success: false, error: { statusCode: 401, msg: 'Login failed. User not found.' } };
    }

    const isPasswordMatch = await compareHashedPassword(password, user.password);

    if (!isPasswordMatch) {
      return { success: false, error: { statusCode: 401, msg: 'Invalid credentials.' } };
    }

    return { success: true, res: user };
  } catch (error) {
    return { success: false, error: { statusCode: 500, msg: 'Login failed. Please try again later.' } };
  }
};

export const updateUserPasswordRepo = async (_id, newpassword, next) => {
  // Write your code here
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpassword, 12);

    // Update the user's password
    const user = await UserModel.findByIdAndUpdate(
        _id,
        { password: hashedPassword },
        { new: true }
    );

    return user
        ? { success: true, res: user }
        : { success: false, error: { statusCode: 404, msg: 'User not found' } };
} catch (error) {
    next(error);
}
};
