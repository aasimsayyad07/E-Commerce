import { Controller, Get, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * @function getCustomers
   * @description Get Details of Customer
   * @returns user information
   */
  @Get('/getCustomers')
  getCustomers() {
    return this.customerService.getCustomers();
  }

  /**
   * @function search
   * @description Get Details of particular Customer using name, email, username
   * @returns user information
   */
  @Get('/search/:query')
  search(@Param('id') id: string) {
    return this.customerService.search(+id);
  }

  /**
   * @function removeCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  @Delete('/:user_id/removeCustomer')
  removeCustomer(@Param('id') id: string) {
    return this.customerService.removeCustomer(+id);
  }
}
