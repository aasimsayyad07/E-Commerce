import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddOrderDto } from 'src/orders/dto/add-order.dto';
import { Order, OrderDocument } from 'src/orders/schema/order.schema';

@Injectable()
export class OrdersConsumerService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private jwtService: JwtService,
  ) {}
  async handleAddOrder(
    @Payload() data: AddOrderDto,
    authorizationHeader: string,
  ) {
    if (!authorizationHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authorizationHeader.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    console.log('Order received:', data);
    const order = new this.orderModel(data);
    return order.save();
  }
}
