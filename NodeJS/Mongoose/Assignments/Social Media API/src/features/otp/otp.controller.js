import { generateOTP, findOTPByUserIdAndCode, deleteOTP,updateUserPasswordRepo } from './otp.repository.js';
import { sendOTPEmailMiddleware } from '../../middlewares/email.middleware.js';

export const sendOTPHandler = async (req, res, next) => {
    try {
      const userId = req._id; 
      const { email } = req.user; 
  
      // Generate a random 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  
      // Save OTP in the database
      await generateOTP(userId, otpCode, 5); // Expires in 5 minutes
  
      // Send OTP via email
      const emailOptions = {
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otpCode}`,
      };
  
      // Use the email middleware to send the OTP
      sendOTPEmailMiddleware({ body: emailOptions }, res, next);
  
      res.status(200).json({ success: true, msg: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      next(new customErrorHandler(500, 'Internal Server Error'));
    }
  };

export const verifyOTPHandler = async (req, res, next) => {
  try {
    const userId = req._id; 
    const { code } = req.body;

    // Find the OTP in the database
    const otp = await findOTPByUserIdAndCode(userId, code);

    if (!otp) {
      return res.status(401).json({ success: false, msg: 'Invalid OTP' });
    }

    // Check if the OTP has expired
    if (new Date() > otp.expiresAt) {
      await deleteOTP(otp._id);
      return res.status(401).json({ success: false, msg: 'OTP has expired' });
    }

    // Valid OTP
    res.status(200).json({ success: true, msg: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error:', error);
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const updateUserPassword = async (req, res, next) => {
    const { newPassword } = req.body;
    const resp = await updateUserPasswordRepo(req._id, newPassword, next);
    if (resp.success) {
      res.status(201).json({
        success: true,
        msg: "password updated successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  };