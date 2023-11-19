// Please don't change the pre-written code
// Import the necessary modules here
import { addUser,confirmLogin, getAllUsers } from "../features/user/model/user.model.js";

const basicAuthMiddleware = (req, res, next) => {
  // Write your code here
  const authHeader= req.headers["authorization"];
  if (!authHeader){
    res.status(401).json({ sucess: "false", message: "No authorization details found" });

  }

  const base64Credentials = authHeader.replace('Basic',"");

  // decode

  const decodedCreds= Buffer.from(base64Credentials,'base64').toString('utf8');

  const creds= decodedCreds.split(':');

  const user= getAllUsers().find(u=> u.email==creds[0] && u.password== creds[1]);
  if (user){
    next();
  }else {
    return res.status(401).json({ sucess: "false", message: "No authorization details found" });

  }

};

export default basicAuthMiddleware;
