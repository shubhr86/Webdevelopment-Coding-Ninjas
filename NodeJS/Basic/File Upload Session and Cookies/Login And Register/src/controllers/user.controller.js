import { registerUser } from "../models/user.model.js";
import { authenticateUser } from "../models/user.model.js";
import { users } from "../models/user.model.js";
export default class UserController {
  getRegister = (req, res, next) => {
    // Write your code here
    res.render('user-register');
   
  };

  getLogin = (req, res, next) => {
    // Write your code here
    res.render('user-login');
    
  };

  // addUser = (req, res) => {
  //   // Write your code here
  //   const { name, email, password } = req.body;

  //   const user = { name, email, password };
  //   registerUser(user);
  //   res.render('user-login');
  //   };
  addUser = (req, res) => {
    const { name, email, password } = req.body;
    const user = {
      id: users.length + 1, // Assign a unique ID for the new user
      name,
      email,
      password,
    };
    users.push(user);
    res.render('user-login');
  };

  loginUser = (req, res) => {
    // Write your code here
    const { email, password } = req.body;
    const userAuth = authenticateUser(email, password);
    if (!userAuth) {
      return res.render("user-login");
    }else{
      return res.render("user-login");
    }
    
  }
}
