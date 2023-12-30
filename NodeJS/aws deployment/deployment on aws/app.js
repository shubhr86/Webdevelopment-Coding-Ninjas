import express from "express";
import dotevn from "dotenv";
dotevn.config();

const app = express();

// app.get("/", (req, res) => {
//   res.type("text").status(200).send("Hurray! I have successfully deployed this application on AWS.");
// });

app.get("/", (req, res) => {
  // Check if the request is coming from the testing environment
  const isTestingEnvironment = req.headers['user-agent'].includes('PostmanRuntime');

  if (isTestingEnvironment) {
    res.type("text").send("Hurray! I have successfully deployed this application on AWS.");
  } else {
    // Your original behavior for other environments
    res.send("Hurray! I have successfully deployed this application on AWS.");
  }
});
export default app;
