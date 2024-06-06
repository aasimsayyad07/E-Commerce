import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  /**
   * @function getCustomers
   * @description Get Details of Customer
   * @returns user information
   */
  getCustomers() {
    return `This action returns all customer`;
  }

  /**
   * @function search
   * @description Get Details of particular Customer using name, email, username
   * @returns user information
   */
  search(id: number) {
    return `This action returns a #${id} customer`;
  }

  /**
   * @function removeCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  removeCustomer(id: number) {
    return `This action removes a #${id} customer`;
  }
}
