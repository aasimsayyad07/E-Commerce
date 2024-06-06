import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/jwt-auth.module';

@Module({
  imports: [AuthModule, CustomerModule],
})
export class AppModule {}
