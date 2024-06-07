const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * @description create Node Mailer Transporter along with SMTP Server Details
 */
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

module.exports = {
  transporter,
};
