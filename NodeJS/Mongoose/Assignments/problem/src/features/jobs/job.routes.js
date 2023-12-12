import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { applyJob } from "./job.controller.js";
import { getLikes,like } from "./like.controller.js";
import { postJob } from "./job.controller.js";

const router = express.Router();

router.route("/post").post(auth, postJob);
router.route("/apply/:id").get(auth, applyJob);


// likes

router.route("/like").post(auth, like);

// Route for liking a user profile
router.route("/like/user").post(auth, like);

// Good-to-Have Feature: Route for getting likes for a specific job or user profile
router.route("/getlikes").get(auth, getLikes);

export default router;
