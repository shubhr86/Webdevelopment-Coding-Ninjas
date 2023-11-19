import http from "http";
import fs from "fs";
import EventEmitter from "events";
import nodemailer from "nodemailer";
import { error } from "console";

class CustomEvent extends EventEmitter {
  mailSent(email) {
    this.emit("mailSent", email);
  }
}

const customEvent = new CustomEvent();

const server = http.createServer((req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codingninjas2k16@gmail.com",
      pass: "slwvvlczduktvhdj",
    },
  });

  if (req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { name, email, message } = JSON.parse(data);

      // TODO: Store user query in "query.txt"
      const queryData = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

      fs.appendFile("queries.txt", queryData, (err) => {
        if (err) {
          console.error("Error writing to queries.txt:", err);
        } else {
          console.log("Query saved!\n");
        }
      });
    
      const mailOptions={
        from:"codingninjas2k16@gmail.com",
        to:email,
        subject: "Query Confirmation",
        text:"Thank you for your query.We have received it.",

      };
         transporter.sendMail(mailOptions, (error,info) =>{
          if (error){
            console.log("Not able to send mail:" ,error);
           }else{
            console.log("Confirming that email sent successfully to ", email);
           }
         });
         res.writeHead(200, { "Content-Type": "text/plain" });

      // TODO: Use Nodemailer to send confirmation email
      // TODO: Emit "mailSent" event
      server.emit("Custom event"+ "mailSent" +"emitted",email);
      res.end("Query received");
    });
  } else {
    res.end("Welcome to Coding Ninjas!");
  }
});

const Solution = () => {
  customEvent.addListener("mailSent", (email) => {
    console.log(`custom event "mailSent" emitted`);
    console.log(
      `confirming that the email has been sent successfully to ${email}`
    );
  });
};

export default server;
export { server, CustomEvent, Solution };
