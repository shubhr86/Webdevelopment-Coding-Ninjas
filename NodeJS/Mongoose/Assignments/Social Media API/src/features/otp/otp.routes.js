import express from 'express';
import { sendOTPHandler, verifyOTPHandler, updateUserPassword } from './otp.controller.js';
const router = express.Router();

// Send OTP for password reset
router.route('/send').post(sendOTPHandler);

// Verify OTP
router.route('/verify').post(verifyOTPHandler);

// Reset user's password
router.route('/reset-password').post(updateUserPassword);

export default router;
