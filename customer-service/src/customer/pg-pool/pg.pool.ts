import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATABASE_POOL',
    useFactory: async () => {
      const pool = new Pool({
        user: process.env.DBUSER,
        host: process.env.DBHOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DBPASSWORD,
        port: Number(process.env.DBPORT),
      });

      pool.on('error', (err: any) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
      });

      return pool;
    },
  },
];
