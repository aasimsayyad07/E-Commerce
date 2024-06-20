import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersProducerService } from './ordersProducer.service';
import { OrdersConsumerService } from './ordersConsumer.service';

@Module({
  providers: [OrdersProducerService, OrdersConsumerService],
  controllers: [OrdersController],
})
export class OrderModule {}
