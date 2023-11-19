// details needed productID, userID, quantity

export default class CartModel{
    constructor(productID, userID, quantity,id){

        this.productID= productID;
        this.userID= userID;
        this.quantity= quantity;
        this.id= id;
    }
    //add
    static add(productID, userID, quantity){
        const cartItem= new CartModel(productID,userID,quantity);
        cartItem.id= cartItems.length+1;
        cartItems.push(cartItem);
        return cartItem;
    }

    // get all items
    static get (userID){
        return cartItems.filter((i) => i.userID == userID);
    }

    // delete

    static delete(cartItemsID, userID){
        const cartItemsIndex= cartItems.findIndex(
            // user can only delete it's own items from cart not others
            (i) => i.id == cartItemsID && i.userID ==userID  
        );
        if (!cartItemsIndex == -1){
            return 'Items not found';
        }else {
            cartItems.splice (cartItemsIndex, 1);
        }
    }
}

var cartItems=[
    new CartModel (1,2,1,1)
]