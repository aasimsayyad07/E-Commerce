import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/orders/schema/order.schema';
import { OrdersController } from './orders/orders.controller';
import { OrdersProducerService } from './orders/ordersProducer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersConsumerService } from './orders/ordersConsumer.service';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/jwt-auth.module';
dotenv.config();

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: 'ORDER-SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_ORDER_QUEUE],
          queue: 'order-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrdersProducerService, OrdersConsumerService],
  controllers: [OrdersController],
})
export class AppModule {}
