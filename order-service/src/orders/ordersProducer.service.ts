import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddOrderDto } from 'src/dto/add-order.dto';
import { Order, OrderDocument } from 'src/schema/order.schema';

@Injectable()
export class OrdersProducerService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject('ORDER-SERVICE') private rabbitClient: ClientProxy,
  ) {}
  async placedOrder(addOrderDto: AddOrderDto) {
    try {
      const { userId, items, totalAmount } = addOrderDto;

      if (!userId || !items || !totalAmount) {
        return 'Missing required fields';
      }

      this.rabbitClient.emit('order-placed', addOrderDto);

      return 'Order Placed';
    } catch (error) {
      return error;
    }
  }

  async getAllOrders() {
    try {
      const order = await this.orderModel.find();
      return order;
    } catch (error) {
      return error;
    }
  }
}
