import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddOrderDto } from 'src/orders/dto/add-order.dto';
import { Order, OrderDocument } from 'src/orders/schema/order.schema';
import axios from 'axios';

@Injectable()
export class OrdersConsumerService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private jwtService: JwtService,
  ) {}
  async handleAddOrder(
    @Payload() data: AddOrderDto,
    email: string,
    authorizationHeader: string,
  ) {
    try {
      if (!authorizationHeader) {
        throw new Error('Authorization header is missing');
      }

      const token = authorizationHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token);
      if (!decoded) {
        throw new Error('Invalid token');
      }

      // console.log('Order received:', data);

      const order = new this.orderModel(data);
      const savedOrder = await order.save();

      /**
       * @description Send EMail Notifitcation
       */
      const userEmail = email;
      const orderID = savedOrder.orderID;

      const sendEmail = await axios.post(
        `${process.env.APIGATEWAYURL}/notification/sendEmailOrderDetails/${userEmail}/${orderID}`,
        null,
        { headers: { Authorization: token } },
      );

      if (sendEmail.data[0].length) {
        return 'Error While Sending Email';
      }

      if (savedOrder) {
        return `Order Placed Successfully`;
      }
    } catch (err) {
      return 'Order confimation failed';
    }
  }
}
