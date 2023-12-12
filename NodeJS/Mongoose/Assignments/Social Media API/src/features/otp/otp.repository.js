import mongoose from 'mongoose';
import { otpSchema } from './otp.schema.js';
import { userSchema } from '../user/user.schema.js';
import bcrypt from 'bcrypt';

const UserModel = mongoose.model('User', userSchema);


const OTPModel = mongoose.model('OTP', otpSchema);

export const generateOTP = async (userId, code, expiresInMinutes) => {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);
  
    const otp = new OTPModel({
      user: userId,
      code,
      expiresAt,
    });
  
    return await otp.save();
  };
  
  export const findOTPByUserIdAndCode = async (userId, code) => {
    return await OTPModel.findOne({ user: userId, code });
  };
  
  export const deleteOTP = async (otpId) => {
    return await OTPModel.findByIdAndDelete(otpId);
  };

  export const updateUserPasswordRepo = async (_id, newpassword, next) => {
    
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
  