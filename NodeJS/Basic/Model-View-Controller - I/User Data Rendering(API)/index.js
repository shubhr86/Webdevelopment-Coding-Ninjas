// Please don't change the pre-written code
// Import the necessary modules here
import  {userController} from "./src/controllers/users.controller.js";
//const UserController = new userController();

import express from "express";
import path from "path";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));

// Implement Express GET route at the path "/users"  here
app.get("/users", userController);

export default app;
