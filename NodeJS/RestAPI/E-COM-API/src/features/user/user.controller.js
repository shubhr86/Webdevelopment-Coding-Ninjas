import  UserModel  from "./user.model.js";
import jwt from 'jsonwebtoken';

export default class UserContoller{

    signup (req,res){
        const {name, email,password, type} = req.body;
        const user= UserModel.Signup(name,email,password,type);
        res.status(201).send(user);

    }

    signIn(req,res){
       const result= UserModel.SignIn(req.body.email,
            req.body.password);
        if (!result){
            return res.status(400).send("Incoorect Credentails")
        }else{
            // from here jwt auth start
            // 1. create token
            const token =jwt.sign({userID: result.id,email:result.email},"AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",{
                expiresIn:'1h',
            })

            //2.send token
            return res.status(200).send(token)

           //return res.send("Login Successful");
        }
    }
}