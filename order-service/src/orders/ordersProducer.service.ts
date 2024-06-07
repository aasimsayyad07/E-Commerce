import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddOrderDto } from 'src/orders/dto/add-order.dto';
import { Order, OrderDocument } from 'src/orders/schema/order.schema';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class OrdersProducerService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject('ORDER-SERVICE') private rabbitClient: ClientProxy,
  ) {}

  /**
   * @function placedOrder
   * @description place new order in Queue - call OrderproducerSerivce
   * @param addOrderDto
   * @returns Order Confirmation Message
   */
  async placedOrder(addOrderDto: AddOrderDto, token: string) {
    try {
      const { userId, items, totalAmount } = addOrderDto;

      if (!userId || !items || !totalAmount) {
        return 'Missing required fields';
      }

      /**
       * @description Check User Is valid to Placed Order - check user ID is prsent in database
       */
      const response = await axios.get(
        `${process.env.APIGATEWAYURL}/customer/search/${parseInt(userId)}`,
        { headers: { Authorization: token } },
      );
      const userEmail = response.data[0].email;

      if (response.data[0].length) {
        return 'User ID is not valid';
      }

      /**
       * @description Check product availabel in product databases
       */
      try {
        for (let i = 0; i < Object.keys(items).length; i++) {
          await axios.get(
            `${process.env.APIGATEWAYURL}/products/search?id=${parseInt(
              items[i].productId,
            )}`,
            { headers: { Authorization: token } },
          );
        }
      } catch (error) {
        return 'Product is not available';
      }

      /**
       * @description Place Order in RabbitMQ Queue
       */
      this.rabbitClient.emit('order-placed', {
        orderData: addOrderDto,
        email: userEmail,
        headers: { authorization: token },
      });

      return 'Order Placed Successfully - Check Email for All Details';
    } catch (error) {
      return error;
    }
  }

  /**
   * @function getAllOrders
   * @description get All orders information from database - call OrderSerivce
   * @returns All Order Information
   */
  async getAllOrders() {
    try {
      const order = await this.orderModel.find();
      return order;
    } catch (error) {
      return error;
    }
  }

  /**
   * @function updateStatus
   * @description update status of Order - call OrderProducerSerivce
   * @param orderID
   * @returns newly updated order details
   */
  async updateStatus(orderID: string, paymentDetails: Record<string, string>) {
    try {
      const { payment } = paymentDetails;

      if (!payment) {
        return 'Payment parameter must be true';
      }

      const order = await this.orderModel.find({ orderID: orderID });
      if (!order) {
        return 'Order Not Found';
      }

      if (order[0].status === 'Pending') {
        order[0].status = 'Processing';
      } else if (order[0].status === 'Processing') {
        order[0].status = 'Shipped';
      } else if (order[0].status === 'Shipped') {
        order[0].status = 'Delivered';
      }

      return order[0].save();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @function getOrderDetailsByID
   * @description get order details for particluar order id - call OrderProducerSerivce
   * @param query as orderID
   * @returns Order details with parictuar order ID
   */
  async getOrderDetailsByID(orderID: string) {
    try {
      const order = await this.orderModel.find({ orderID: orderID });
      if (!order) {
        return 'Order Not Found';
      }

      return order[0];
    } catch (err) {
      console.log(err);
    }
  }
}
