import jwt from 'jsonwebtoken';

const jwtAuth=(req,res,next)=>{
    const token = req.headers['authorization'];

    if (!token){
        return res.status(401).send('Unauthorized');

    }

    try{
        const payload =jwt.verify(
            token,
            "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz"
        );
        // passgin userID to req.userID to authenciate user in other API
        //console.log('Decoded JWT payload:', payload);
        req.userId = payload.userID;
    }catch(err){
        return res.status(401).send('Unauthorized');
    }
    next();

};
export default jwtAuth;