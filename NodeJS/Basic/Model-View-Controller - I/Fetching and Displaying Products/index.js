import express from "express";
import ProductController1 from "./src/controllers/product.controller.js";


const productController = new ProductController1();
const app = express();

app.get("/", productController.getProducts);

export default app;
