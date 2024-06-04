import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/jwt.auth.module';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_PRODUCT_DATABASE),
    ProductsModule,
  ],
})
export class AppModule {}
