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
  async removeCustomer(id: number) {
    try {
      let results: QueryResult<any>;
      results = await this.pool.query(queires.searchID, [id]);
      if (!results.rowCount) {
        return 'User does not exist in Database';
      }

      results = await this.pool.query(queires.removeCustomer, [id]);
      return { code: 'Customers removed Successfully from database' };
    } catch (error) {
      return error;
    }
  }

  /**
   * @function updateCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  async updateCustomer(id: number, payload: Record<string, string>) {
    try {
      const { name } = payload;

      let results: QueryResult<any>;
      results = await this.pool.query(queires.searchID, [id]);
      if (!results.rowCount) {
        return { code: 'User does not exist in Database' };
      }

      results = await this.pool.query(queires.updateCustomer, [name, id]);
      return { code: 'Customer Details Updated Successfully' };
    } catch (error) {
      return error;
    }
  }
}
