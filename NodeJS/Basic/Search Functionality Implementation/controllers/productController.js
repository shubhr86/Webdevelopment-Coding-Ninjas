// Please don't change the pre-written code
// Import the necessary modules here

import ProductModel from "../models/ProductModel.js";

const productModel = new ProductModel();
export default class productController {
  index = (req, res) => {
    res.render("index", { products: productModel.getAllProducts() });
  };

  search = (req, res) => {
    // Write your code here
   console.log(req.body.name.toLowerCase())

   const productName = req.body.name.toLowerCase();
    const searchResults = productModel.searchResult(productName);
    res.render("searchResult", { products: searchResults });
  };
}