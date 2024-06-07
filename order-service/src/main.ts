import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const options = new DocumentBuilder()
    .setTitle('Orders API')
    .setDescription('Defined all Order Service API Endpoints')
    .setVersion('1.0')
    .addTag('Orders')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('orders/apidocs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
