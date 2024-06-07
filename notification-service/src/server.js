const express = require("express");
const { transporter } = require("./Mailtrap/transporter");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

//Define API to Send Email after User order Product
app.post(
  "/notification/sendEmailOrderDetails/:email/:orderID",
  async (req, res) => {
    try {
      const email = req.params.email;
      const orderID = req.params.orderID;
      const token = req.headers["authorization"];

      //used order id for feth details
      const orderDetails = await axios.get(
        `${process.env.APIGATEWAYURL}/orders/${orderID}/orderDetails`,
        { headers: { Authorization: token } }
      );

      const items = orderDetails.data.items
        .map((item) => {
          return `\n Product ID = ${item.productId},\n Qunatity = ${item.quantity} \n`;
        })
        .join("");

      let info = await transporter.sendMail({
        from: "mailtrap@demomailtrap.com",
        to: email,
        subject: "Order Confirmation Details",
        text: `Hello ${email}, Here is your order details
      Customer ID = ${orderDetails.data.user_Id},
      Items :
      \t ${items},
      Total Amount = ${orderDetails.data.totalAmount}`,
      });

      res.status(200).send("Email Send Successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .send({ error: "Failed to send email", details: error.message });
    }
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
