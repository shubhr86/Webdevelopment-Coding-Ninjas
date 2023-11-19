// logger.middleware.js
import fs from "fs";

export const loggerMiddleware = async (req, res, next) => {
  const timestamp = new Date().toString();
  const reqUrl = req.url;

  if (!req.url.includes('login')) {
    const logData = {
      level: "error",
      timestamp,
      "request URL": reqUrl,
      "error message": "Request failed",
    };

    fs.appendFile('error.log', JSON.stringify(logData) + "\n", (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });
  }
  next();
};
