import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/customer.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBHOST,
      port: +process.env.DBPORT,
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
