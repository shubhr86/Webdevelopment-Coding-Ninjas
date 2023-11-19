// Please don't change the pre-written code
// Import the necessary modules here
import { addToCart, removeFromCart, cartItems} from "../model/cart.model.js";
export const addToCartController = (req, res) => {
  // Write your code here
  const {productId , quantity} = req.query;
  const userId = req.userId;

  if (!productId || !quantity){
    return res.json({success:false, msg:"Invaild input"});
  }

  const updateCart= addToCart(userId,productId, quantity);
  //const get = getAll(userId);
  res.json({ success: true, item: updateCart });
  
};

export const removeFromCartController = (req, res) => {
  const cartItemId = parseInt(req.params.itemId); // Convert to number
  const userId = req.userId;

  console.log('cartid:', cartItemId);

  // Check if the cartItemId exists in the user's cart
  const cartItemExists = cartItems.some((item) => item.id === cartItemId && item.userId === userId);

  if (!cartItemExists) {
    return res.json({ success: false, msg: "operation not allowed" });
  }

  const removedCartItem = removeFromCart(userId, cartItemId);
  console.log('removedCartItem:', removedCartItem);

  if (removedCartItem) {
    res.json({ success: true, deletedCartItem: removedCartItem });
  } else {
    res.json({ success: false, msg: "Item not found in the cart" });
  }
};

