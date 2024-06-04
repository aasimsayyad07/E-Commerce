import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schema/order.schema';
import { OrdersController } from './orders/orders.controller';
import { OrdersProducerService } from './orders/ordersProducer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersConsumerService } from './orders/ordersConsumer.service';

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
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/orderDB'),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrdersProducerService, OrdersConsumerService],
  controllers: [OrdersController],
})
export class AppModule {}
