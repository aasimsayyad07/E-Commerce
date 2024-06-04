import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersProducerService } from './ordersProducer.service';
import { AddOrderDto } from 'src/dto/add-order.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrdersConsumerService } from './ordersConsumer.service';

@Controller()
export class OrdersController {
  constructor(
    private ordersProducerService: OrdersProducerService,
    private orderCoumsumerService: OrdersConsumerService,
  ) {}

  @Post('/placeOrder')
  addOrder(@Body() addOrderDto: AddOrderDto) {
    return this.ordersProducerService.placedOrder(addOrderDto);
  }

  @EventPattern('order-placed')
  handleOrder(@Payload() data: AddOrderDto) {
    return this.orderCoumsumerService.handleAddOrder(data);
  }

  @Get('/getAllOrders')
  getAllOrders() {
    return this.ordersProducerService.getAllOrders();
  }
}
