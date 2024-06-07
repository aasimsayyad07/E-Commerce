// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/jwt-auth.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [AuthModule, CustomerModule],
})
export class AppModule {}
