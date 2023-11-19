// Please don't change the pre-written code
// Import the necessary modules here
// Write your code here

import { fetchAllProducts,rateProductModel } from "../model/product.model.js";

export const getAllProducts = (req, res, next) => {
  const products = fetchAllProducts();
  res.json({ success: true, products });
};
export const getOneProduct = (req, res, next) => {
  res.json({ success: true, msg: "getOneProduct working" });
};
export const addProduct = (req, res, next) => {
  res.json({ success: true, msg: "addProduct working" });
};
// export const rateProduct = (req, res, next) => {
//   // Write your code here
//   const userId = req.query.userId;
//   const productId= req.query.productId;
//   const rating= req.query.rating;
//   const error = rateProductModel(
//     productId,
//     userId,
//     rating
//   ) 
//   // ensure rating fall between the 0 to 5
//   if (rating>=6){
//     res.json({ success: false, msg: "rating should be b/w 0 and 5"});

//   } else {
//   res.json({ success: true, error });
//   }
export const rateProduct = (req, res, next) => {
  const userId = req.query.userId;
  const productId = req.query.productId;
  const rating = req.query.rating;

  if (userId >=4) {
    return res.json({ success: false, msg: "user not found" });
  }

  if (productId >=4) {
    return res.json({ success: false, msg: "product not found" });
  }

  if (rating === undefined || rating < 0 || rating > 5) {
    return res.json({ success: false, msg: "rating should be b/w 0 and 5" });
  }

  const updatedProduct = rateProductModel(productId, userId, rating);

  if (updatedProduct) {
    return res.json({ success: true, msg: updatedProduct });
  } 
  else {
    return res.json({ success: false, msg: "Product or user not found" });
  }
};
