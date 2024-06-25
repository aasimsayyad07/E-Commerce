import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProxyMiddleware } from './middleware/proxy.middleware';
import { RequestMiddleware } from './middleware/request.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //apply request middlware globbaly
  app.use(new RequestMiddleware().use);
  // Use the proxy middleware
  app.use(new ProxyMiddleware().use);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`API GATEWAY STARTED on port ${PORT}`);
}
bootstrap();
