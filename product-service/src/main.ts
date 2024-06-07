import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription('Defined all Product Service API Endpoints')
    .setVersion('1.0')
    .addTag('Products')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('products/apidocs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
