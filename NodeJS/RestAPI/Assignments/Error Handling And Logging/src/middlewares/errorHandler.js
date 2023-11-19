// Please don't change the pre-written code
// Import the necessary modules here

// errorHandling.js
import fs from "fs";

export class customErrorHandler extends Error {
  constructor(code, message, requestUrl) {
    super(message);
    this.code = code;
    this.requestUrl = requestUrl;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof customErrorHandler) {
    const logData = {
      level: "error",
      timestamp: new Date().toString(),
      "request URL": err.requestUrl,
      "error message": err.message,
    };

    fs.appendFile('error.log', JSON.stringify(logData) + "\n", (error) => {
      if (error) {
        console.error("Error writing to log file:", error);
      }
    });

    res.status(err.code).send(err.message);
  } else {
    const logData = {
      level: "error",
      timestamp: new Date().toString(),
      "request URL": req.url,
      "error message": "Oops! Something went wrong... Please try later.",
    };

    fs.appendFile('error.log', JSON.stringify(logData) + "\n", (error) => {
      if (error) {
        console.error("Error writing to log file:", error);
      }
    });

    res.status(500).send("Oops! Something went wrong... Please try later.");
  }
};
