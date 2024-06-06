import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PgModule } from './pg-pool/pg.moulde';

@Module({
  imports: [PgModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
