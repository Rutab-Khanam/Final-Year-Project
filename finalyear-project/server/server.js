const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));


// get driver connection
const dbo = require("./db/conn");
 

//nodemailer
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
 });


app.post("/sendInvite", function (req, res) {
  console.log("req.body:",req.body);
  console.log(`req.body.message:`, req.body.message);
  let mailOptions = {
    from: "rutabkhanwork@gmail.com",
    to: req.body.email,
    subject: "Meeting Invitation",
    text: req.body.message,
  };
 
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      console.log(data);
      console.log("== Message Sent ==");
      res.json({
        status: "success",
      });
    }
  });
});


app.post("/sendConfirmation", function (req, res) {
  console.log("req.body:",req.body);
  console.log(`req.body.message:`, req.body.message);
  let mailOptions = {
    from: "rutabkhanwork@gmail.com",
    to: req.body.email,
    subject: "Signup Confirmation!",
    text: req.body.message,
  };
 
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      console.log(data);
      console.log("== Message Sent ==");
      res.json({
        status: "success",
      });
    }
  });
});




app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});