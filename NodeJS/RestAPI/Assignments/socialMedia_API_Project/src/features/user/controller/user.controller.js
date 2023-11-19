import UserModel from "../model/user.model.js";
import jwt from 'jsonwebtoken';

export default class UserContoller{
    
    // user added
    addUser(req,res){
        const {name,email,password}= req.body;
        const user= UserModel.signup(name,email,password);
        res.status(201).send(user);
    }
    // user signIn
    userLogin(req,res){
        const result
        = UserModel.signin(req.body.email, req.body.password);
        if (!result){
            return res.status(400).send("Incorrect credential");
        }else {
            const token =jwt.sign({userID:result.id,email:result.email},"AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",{
                expiresIn:'1h',
               })
            return res.status(200).send(token);

        }

    }

}