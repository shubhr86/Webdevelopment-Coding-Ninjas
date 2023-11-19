// Please don't change the pre-written code
// Import the necessary modules here
import jwt from 'jsonwebtoken';
const jwtAuth = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ success: false, msg: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, 'l988MSQRO7wPaH6wrRnxt9wKXQEcUtMv');
    req.user = decoded; // Attach the user data to req.user
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: 'Invalid Token' });
  }
};

export default jwtAuth;
