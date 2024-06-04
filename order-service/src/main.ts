import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'order-queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices(); // Start all microservices
  await app.listen(3002);
}
bootstrap();
