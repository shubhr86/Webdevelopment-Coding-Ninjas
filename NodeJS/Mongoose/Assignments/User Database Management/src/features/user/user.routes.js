import express from "express";
import {
  updateUserPassword,
  userLogin,
  userLogout,
  userRegistration,
} from "./user.cotroller.js";
import { auth } from "../../middlewares/jwtAuth.js";

const router = express.Router();

router.route("/register").post(userRegistration);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);
router.route("/update/password").post(auth, updateUserPassword);

export default router;
