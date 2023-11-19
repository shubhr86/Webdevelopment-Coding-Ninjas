// Please don't change the pre-written code
// Import the necessary modules here

import { updateUsers, users } from "./user.model.js";

export const renderUpdateForm = (req, res) => {
  res.render("update-form", { user: users[0] });
};

// Write your code here

export const updateUser=(req,res) =>{
  // const {name, email, image}= req.body;
  // console.log(req.body)
  //  const users={
  //   name,
  //   email,
  //   image,
  //  };
  //  updateUsers(users);
  updateUsers(req.body)
  

  res.status(201).render("update-form", { user: req.body});
  }

