import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Customer API')
    .setDescription('Defined all Customer Service API Endpoints')
    .setVersion('1.0')
    .addTag('Customer')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('customer/apidocs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
