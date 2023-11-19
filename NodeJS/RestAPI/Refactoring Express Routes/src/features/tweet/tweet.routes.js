// import express

import express from 'express';
import { getTweets, createTweet } from './tweet.controller.js';


// initialzie express router.

const router = express.Router();


router.get("/", getTweets);

router.post("/", createTweet);

export default router;