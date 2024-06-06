import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PgModule } from 'src/IAM/pg-pool/pg.module';

@Module({
  imports: [PgModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
