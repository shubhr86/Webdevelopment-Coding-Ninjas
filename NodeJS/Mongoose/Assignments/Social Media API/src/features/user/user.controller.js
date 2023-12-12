import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { createUser,userLoginRepo,logoutAllDevices,getUserDetails,getAllUserDetails,updateUserDetails } from './user.repositery.js';
import {customErrorHandler} from '../../middlewares/errorHandler.js'

export const createuser = async (req, res,next) => {
  try {
    let { password } = req.body;
    password = await bcrypt.hash(password, 12);
    
    const resp = await createUser({ ...req.body, password });

    if (resp.success) {
      res.status(201).json({
        success: true,
        msg: "User registration successful",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Internal Server Error"));
  }
};

export const loginUser = async (req, res,next) => {
  try {
    const resp = await userLoginRepo(req.body);
  
    if (resp.success) {
      const { _id, name, email, gender } = resp.res;

      const token = jwt.sign({ _id, user: { name, email, gender } }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res
        .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
        .json({ success: true, msg: "User login successful", token });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    //console.error('Login error:', error);

    next(new customErrorHandler(500, "Internal Server Error"));
  }
};
export const userLogout = (req, res, next) => {
  res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
};


export const userLogoutAllDevices = (req, res, next) => {
  try {
    const userId = req._id; 

    // Create a new token with a very short expiration time
    const shortExpiryToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1s' });

    // Clear the 'jwtToken' cookie with the new short-expiry token
    res.cookie('jwtToken', shortExpiryToken, { maxAge: 1000, httpOnly: true });

    res.status(200).json({ success: true, msg: 'Logout from all devices successful' });
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const getUserDetailsHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const resp = await getUserDetails(userId);

    if (resp.success) {
      res.status(200).json({
        success: true,
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const getAllUserDetailsHandler = async (req, res, next) => {
  try {
    const resp = await getAllUserDetails();

    if (resp.success) {
      res.status(200).json({
        success: true,
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};

export const updateUserDetailsHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const resp = await updateUserDetails(userId, updates);

    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: 'User details updated successfully',
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, 'Internal Server Error'));
  }
};
