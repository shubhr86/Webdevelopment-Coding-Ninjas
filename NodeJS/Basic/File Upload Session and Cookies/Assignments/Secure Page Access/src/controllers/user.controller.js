import { authenticateUser, registerUser } from "../models/user.model.js";

export default class UserController {
  getRegister = (req, res, next) => {
    res.render("user-register",);
  };
  getLogin = (req, res, next) => {
    res.render("user-login");
  };
  addUser = (req, res) => {
    const status = registerUser(req.body);
    if (status) return res.render("user-login");
  };
  loginUser = (req, res) => {
    const isAuth = authenticateUser(req.body);
    if (isAuth) {
      // Write your code here
      const { email } = req.body;
     req.session.userEmail = email;

      res.render("msgPage", { message: "login successfull",userEmail: req.session.userEmail });
    } else res.render("msgPage", { message: "login failed" ,userEmail: req.session.userEmail});

  };
  getSecure = (req, res) => {

    res.render("secure-page");
  };
  logout (req,res){
    req.session.destroy((error) =>{
      if (error){
        console.log(error);
      }else {
        res.redirect('/login')
      }
    })
  }
}
