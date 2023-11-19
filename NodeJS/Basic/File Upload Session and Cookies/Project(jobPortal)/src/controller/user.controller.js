import { getAllUsers, findUserByEmail, createUser , users} from '../model/user.model.js';


const getAllUsersController = (req, res) => {
  const users = getAllUsers();
  res.render('users-list', { users });
};

const registerUserController = (req, res) => {
  // Handle user registration form submission
  const newUser = req.body; // Assuming form fields match the User class
  createUser(newUser);
  res.redirect('/login');
};

const loginUserController = (req, res) => {
  // Handle user login form submission
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  const lastVisit = req.cookies.lastVisit; // Retrieve lastVisit from cookies

  if (user && user.password === password) {
    // Set a session or cookie to track the logged-in user
    req.session.user = user;

    const formattedLastVisit = new Date(lastVisit).toLocaleString();

    res.render('recruiter-dashboard', { user, lastVisit: formattedLastVisit });
 }
  else {
   res.render('login')

   }
};





const logoutUserController = (req, res) => {
  // Handle user logout, clear session or cookie
  req.session.user = undefined;

  res.redirect('/login');
};

const errorMessage =(req, res) => {
  res.redirect("/404");
}
 export { errorMessage,getAllUsersController, registerUserController, loginUserController, logoutUserController };
