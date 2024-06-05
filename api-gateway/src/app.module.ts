import { Module } from '@nestjs/common';
import { AuthModule } from './IAM/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
