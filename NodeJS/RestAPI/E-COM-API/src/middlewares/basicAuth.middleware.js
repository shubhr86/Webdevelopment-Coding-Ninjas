import UserModel from "../features/user/user.model.js";

const basicAuth =(req,res, next) =>{

    //1. check if auth header is empty.

    const authHeader= req.headers["authorization"];

    if (!authHeader){
        return res.status(401).send("No Auth details found");

    }
        //2. extract credentials.
        const base64Credentials = authHeader.replace('Basic','');

        //3. decode credentails.

        const decodedCreds= Buffer.from(base64Credentials, 'base64').toString('utf8');

        const creds= decodedCreds.split(':');
        // 4. 
        const user = UserModel.getAll().find (u=> u.email=creds[0] && u.password ==creds[1]);

        if (user){
            next();
        }else {
            return res.status(401).send("Incorect Credentials");;
        }

}
export default basicAuth;