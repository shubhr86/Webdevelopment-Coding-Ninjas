import CartModel from "./cart.model.js";
export default class CartItemsController{
    add(req,res){
        const {productID, quantity}= req.query;
        // retreiving userID from the auth token (jwt)
        const userID= req.userID;
        CartModel.add(productID,userID,quantity);
        res.status(201).send("Cart is Updated");
    }

    // get All cart items
    get(req,res){
        const userID = req.userID;
        const items= CartModel.get(userID);
        return res.status(200).send(items);
    }

    delete (req,res){
        const userID = req.userID;
        const cartItemsID= req.params.id;
        console.log('cartid:'+ cartItemsID)

       const err= CartModel.delete(cartItemsID,userID);
       if (err){
        return res.status(404).send(err);
       }
       return res.status(200).send('cart items removed');

    }


   
}