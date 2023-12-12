import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codingninjas2k16@gmail.com', 
    pass: 'slwvvlczduktvhdj', 
  },
});

export const sendOTPEmailMiddleware = async (req, res, next) => {
  try {
    const { to, subject, text } = req.body;

    // Define the email options
    const mailOptions = {
      from: 'codingninjas2k16@gmail.com', 
      to,
      subject,
      text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};
