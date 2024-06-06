import { Module } from '@nestjs/common';
import { databaseProviders } from './pg.pool';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class PgModule {}
