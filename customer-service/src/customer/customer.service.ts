import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  /**
   * @function getCustomers
   * @description Get Details of Customer
   * @returns user information
   */
  async getCustomers(): Promise<User[]> {
    try {
      // const customers = await this.pool.query(queires.getCustomers);
      // return customers.rows;
      const users = await this.usersRepository
        .createQueryBuilder('customer')
        .select([
          'customer.user_id',
          'customer.name',
          'customer.email',
          'customer.gender',
          'customer.username',
        ])
        .getMany();
      return users;
    } catch (error) {
      return error;
    }
  }

  /**
   * @function search
   * @description Get Details of particular Customer using name, email, username
   * @returns user information
   */
  async search(param: Record<string, string>): Promise<User[]> {
    try {
      const { query } = param;

      if (!query) {
        return [];
      }
      let users: any;
      if (!isNaN(+query)) {
        users = await this.usersRepository
          .createQueryBuilder('customer')
          .select([
            'customer.user_id',
            'customer.name',
            'customer.email',
            'customer.gender',
            'customer.username',
          ])
          .where('customer.user_id = :query', { query: parseInt(query) })
          .getMany();
      } else {
        users = await this.usersRepository
          .createQueryBuilder('customer')
          .select([
            'customer.user_id',
            'customer.name',
            'customer.email',
            'customer.gender',
            'customer.username',
          ])
          .where('customer.name ILIKE :query', { query: `%${query}%` })
          .where('customer.email ILIKE :query', { query: `%${query}%` })
          .getMany();
      }

      if (users.length === 0) {
        return [];
      }

      return users;
    } catch (error) {
      return error;
    }
  }

  /**
   * @function removeCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  async removeCustomer(user_id: number): Promise<void | string> {
    try {
      const results = await this.usersRepository.findOne({
        where: { user_id: user_id },
      });

      if (!results) {
        return 'User not found';
      }
      await this.usersRepository.delete(user_id);
      return 'Customers removed Successfully from database';
    } catch (error) {
      return error;
    }
  }

  /**
   * @function updateCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  async updateCustomer(id: number, name: User): Promise<void | string> {
    try {
      const results = await this.usersRepository.findOne({
        where: { user_id: id },
      });

      if (!results) {
        return 'User not found';
      }
      await this.usersRepository.update(id, name);
      return 'Customer Details Updated Successfully';
    } catch (error) {
      return error;
    }
  }
}
