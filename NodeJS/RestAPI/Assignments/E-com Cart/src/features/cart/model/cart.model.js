// Please don't change the pre-written code
// Import the necessary modules here

let cartId = 0;
export class cartModel {
  constructor(userId, productId, quantity) {
    this.id = ++cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = Number(quantity);
  }
}
export const cartItems = [new cartModel(1, 2, 5), new cartModel(3, 3, 10)];

export const addToCart = (userId, productId, quantity) => {
  // Write your code here
  
  const existingItem= cartItems.find((i) => i.userId == userId && i.productId == productId);
  if (existingItem){
    // update the cart
    existingItem.quantity += Number(quantity);
  }else {
    const cartItem = new cartModel (userId,productId,quantity);
    //cartItem.id= cartItems.length +1;
    cartItems.push(cartItem);
   // return cartItem;
  }
  const updatedCart = cartItems.filter((i) => i.userId == userId);
  return updatedCart;
};

export const removeFromCart = (userId, cartItemId) => {
  const cartItemIndex = cartItems.findIndex(
    (i) => i.id == cartItemId && i.userId == userId
  );

//   if (!cartItemIndex == -1) {
//     return 'Item not found';
// } else {

    // If the item is found, remove it from the cartItems array
    const removedCartItem = cartItems.splice(cartItemIndex, 1);
    return removedCartItem;
  }

//}
