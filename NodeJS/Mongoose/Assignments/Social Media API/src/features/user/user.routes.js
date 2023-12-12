import express from 'express';
import { createuser,loginUser,updateUserDetailsHandler,userLogout,
getAllUserDetailsHandler,getUserDetailsHandler,userLogoutAllDevices } from './user.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';

const router = express.Router();

router.route('/signup').post(createuser);
router.route('/signin').post(loginUser);
router.route('/logout').get(auth,userLogout);
router.route('/logout-all-devices').get(auth,userLogoutAllDevices);
router.route('/get-details/:userId').get(auth,getUserDetailsHandler);
router.route('/get-all-details').get(auth,getAllUserDetailsHandler);
router.route('/update-details/:userId').put(auth,updateUserDetailsHandler);


export default router;
