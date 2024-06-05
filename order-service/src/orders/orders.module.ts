import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/orders/schema/order.schema';
import { OrdersController } from './orders.controller';
import { OrdersProducerService } from './ordersProducer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersConsumerService } from './ordersConsumer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER-SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'order-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrdersProducerService, OrdersConsumerService],
  controllers: [OrdersController],
})
export class OrderModule {}
