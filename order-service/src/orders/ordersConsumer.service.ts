import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddOrderDto } from 'src/dto/add-order.dto';
import { Order, OrderDocument } from 'src/schema/order.schema';

@Injectable()
export class OrdersConsumerService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}
  async handleAddOrder(@Payload() data: AddOrderDto) {
    console.log('Order received:', data);
    const order = new this.orderModel(data);
    return order.save();
  }
}
