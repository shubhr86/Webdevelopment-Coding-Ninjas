// middlewares/auth.js
import { users } from "../model/user.model.js"; 
  
export function authenticateRecruiter(req, res, next) {
  if (req.session && req.session.user) {
    // Check if the user exists in your list of recruiters (users)
    const loggedInUser = users.find(user => user.id === req.session.user.id);

    if (loggedInUser) {
      // User is logged in and exists in your list of recruiters
      req.user = loggedInUser; 
      return next();
    }
  }

  // User is not logged in or not a recruiter
  res.redirect('/login'); // Redirect to the login page
}

  
  export const checkRecruiterSession = (req, res, next) => {
    if (req.session.user) {
      // The user is authenticated, you can continue
      req.user = req.session.user; 
      return next();
    } else {
      // Redirect or handle unauthenticated users
      res.redirect('/login');
    }
  };
  
  
 