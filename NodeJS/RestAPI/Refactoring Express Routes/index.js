import express from "express";
import tweetRoutes from "./src/features/tweet/tweet.routes.js"; // Import the router as tweetRoutes
const app = express();

// TODO: Refactor these route handlers into a separate routes file using express Router

app.use("/api/tweets",tweetRoutes)

app.get('/', (req, res)=>{
  res.status(200).send("Welcome to Ecommerce APIs");
});

app.listen(5000, () => {
  console.log("server is listening at port 5000");
});
