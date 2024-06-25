import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersProducerService } from './ordersProducer.service';
import { OrdersConsumerService } from './ordersConsumer.service';
import { RequestIdInterceptor } from 'src/interceptors/request.interceptor';

@Module({
  providers: [
    { provide: 'REQUEST_ID_INTERCEPTOR', useClass: RequestIdInterceptor },
    OrdersProducerService,
    OrdersConsumerService,
  ],
  controllers: [OrdersController],
})
export class OrderModule {}
