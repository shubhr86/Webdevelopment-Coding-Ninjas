import express  from 'express';
import UserContoller from '../controller/user.controller.js';

const userRouter = express.Router();
const userController= new UserContoller();

userRouter.post('/signup',userController.addUser);
userRouter.post('/signin', userController.userLogin);


export default userRouter;