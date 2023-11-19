import express from 'express';

import  UserContoller  from './user.controller.js';
const userRouter = express.Router();
const userController = new UserContoller();


userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signIn);


export default userRouter;