const express = require("express");
const server = express();
const fs = require("fs");
const path = require("path");

// Implement the 'renderStatic' function
const renderStatic = (server, staticDir) => {
  server.get("/index.html", (req, res) => {
    const indexPath = path.join(staticDir, "index.html");
    
    // Check if the file exists
    if (fs.existsSync(indexPath)) {
      // Read the file and send it as the response
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.status(500).send("Error reading file");
        } else {
          res.setHeader("Content-Type", "text/html");
          res.status(200).send(data); // Corrected the status code to 200
        }
      });
    } else {
      res.status(404).send("File not found");
    }
  });
};

server.get("/", (req, res) => {
  res.send("get method called!");
});

// Define the directory of the static folder
const staticDir = path.join(__dirname, "public");

// Call renderStatic function with server and staticDir arguments
renderStatic(server, staticDir);

module.exports = { renderStatic, server };
