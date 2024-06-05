import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_ORDER_QUEUE],
      queue: 'order-queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices(); // Start all microservices
  await app.listen(process.env.PORT);
}
bootstrap();
