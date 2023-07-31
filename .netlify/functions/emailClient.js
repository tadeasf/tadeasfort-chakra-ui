/** @format */

require("dotenv").config();
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  const { email, subject, message } = JSON.parse(event.body);

  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "apikey", // generated ethereal user
      pass: process.env.SENDGRID_API_KEY, // generated ethereal password
    },
  });

  let mailOptions = {
    from: email, // sender address
    to: process.env.RECEIVER_EMAIL, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
