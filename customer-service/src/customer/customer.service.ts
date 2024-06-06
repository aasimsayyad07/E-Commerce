import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import * as queires from './queires/customer.queires';

@Injectable()
export class CustomerService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}
  /**
   * @function getCustomers
   * @description Get Details of Customer
   * @returns user information
   */
  async getCustomers() {
    try {
      const customers = await this.pool.query(queires.getCustomers);
      return customers.rows;
    } catch (error) {
      return error;
    }
  }

  /**
   * @function search
   * @description Get Details of particular Customer using name, email, username
   * @returns user information
   */
  async search(param: Record<string, string>) {
    try {
      const { query } = param;

      let results: QueryResult<any>;
      if (!isNaN(+query)) {
        results = await this.pool.query(queires.searchID, [parseInt(query)]);
      } else {
        results = await this.pool.query(queires.search, [query]);
      }

      if (results.rowCount == 0) {
        return 'User is not found';
      }

      return results.rows;
    } catch (error) {
      return error;
    }
  }

  /**
   * @function removeCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  removeCustomer(id: number) {
    return `This action removes a #${id} customer`;
  }

  /**
   * @function updateCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  updateCustomer() {}
}
