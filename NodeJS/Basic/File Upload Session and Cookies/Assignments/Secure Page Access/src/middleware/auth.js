export const auth = (req, res, next) => {
  // Write your code here
  if (req.session.userEmail){
    next();
  }else {
    res.status(200).send('login first to access secure page');
  }
};
