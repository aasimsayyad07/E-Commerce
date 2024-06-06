import { Controller, Get, Param, Delete, Put } from '@nestjs/common';
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
  search(@Param() param: Record<string, string>) {
    return this.customerService.search(param);
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

  /**
   * @function updateCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  @Put('/:user_id/updateCustomer')
  updateCustomer() {
    return this.customerService.updateCustomer();
  }
}
