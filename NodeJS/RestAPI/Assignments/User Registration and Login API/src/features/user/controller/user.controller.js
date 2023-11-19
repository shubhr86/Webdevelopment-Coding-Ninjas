// Please don't change the pre-written code
// Import the necessary modules here
import { addUser ,confirmLogin,getAllUsers} from "../model/user.model.js";
export const registerUser = (req, res, next) => {
  // Write your code here
  const {name, email,password}= req.body;
  const data={name, email,password};
  console.log(data);
  const user=addUser(data);
  res.status(201).json({ status: "success", user });

};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const data={ email,password};
  const user = confirmLogin(data);

  if (!user) {
    res.status(400).json({ status: "failure", msg: "invalid user details" });
  } else {
    res.status(200).json({ status: "success", msg: "login successful" });
  }
};
