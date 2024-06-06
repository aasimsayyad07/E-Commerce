import { Controller, Get, Param, Delete, Put, Body } from '@nestjs/common';
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
   * @function updateCustomer
   * @description remove user from customer database
   * @params user id
   * @returns reomved message
   */

  @Put('/:user_id/updateCustomer')
  updateCustomer(
    @Param('user_id') id: number,
    @Body() userName: Record<string, string>,
  ) {
    return this.customerService.updateCustomer(id, userName);
  }

  /**
   * @function removeCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  @Delete('/:user_id/removeCustomer')
  removeCustomer(@Param('user_id') id: number) {
    return this.customerService.removeCustomer(id);
  }
}
