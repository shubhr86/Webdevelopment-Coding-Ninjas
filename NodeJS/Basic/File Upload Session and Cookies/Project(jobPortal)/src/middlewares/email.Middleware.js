// emailMiddleware.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codingninjas2k16@gmail.com',
    pass: 'slwvvlczduktvhdj',
  },
});

export function sendConfirmationEmail(applicantEmail, jobTitle) {
  const mailOptions = {
    from: 'codingninjas2k16@gmail.com', // Sender email
    to: applicantEmail, // Receiver email
    subject: 'Application Confirmation', // Email subject
    text: `Thank you for applying for the job: ${jobTitle}. Your application has been received.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
