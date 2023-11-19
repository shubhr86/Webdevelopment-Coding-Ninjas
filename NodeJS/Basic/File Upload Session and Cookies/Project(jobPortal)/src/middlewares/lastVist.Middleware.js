// lastVisitMiddleware.js
export function trackLastVisit(req, res, next) {
    const now = new Date();
    const lastVisit = req.cookies.lastVisit;
    if (lastVisit) {
      console.log(lastVisit);
    } else {
      console.log('Welcome! It looks like your first visit.');
    }
  
    // Set the last visit time as a cookie
    res.cookie('lastVisit', now, { maxAge: 900000, httpOnly: true });
  
    next();
  }
  