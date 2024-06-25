import {
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthguard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entity/customer.entity';
import { Request } from 'express';

@UseGuards(JwtAuthguard)
@ApiBearerAuth()
@ApiTags('Customer')
@Controller('/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * @function getCustomers
   * @description Get Details of Customer
   * @returns user information
   */
  @Get('/getCustomers')
  @ApiOperation({ summary: 'Get All Customers' })
  getCustomers(@Req() req: Request): Promise<User[]> {
    const requestId = req.headers['x-request-id'];
    console.log(requestId);
    return this.customerService.getCustomers();
  }

  /**
   * @function search
   * @description Get Details of particular Customer using name, email, username
   * @returns user information
   */
  @Get('/search/:query')
  @ApiOperation({ summary: 'Search Particular Customers' })
  search(@Param() param: Record<string, string>): Promise<User[]> {
    return this.customerService.search(param);
  }

  /**
   * @function updateCustomer
   * @description remove user from customer database
   * @params user id
   * @returns reomved message
   */

  @Put('/:user_id/updateCustomer')
  @ApiOperation({ summary: 'Update particular Customers details using ID' })
  updateCustomer(
    @Param('user_id') id: number,
    @Body() userName: User,
  ): Promise<void | string> {
    return this.customerService.updateCustomer(id, userName);
  }

  /**
   * @function removeCustomer
   * @description remove user from customer database
   * @returns reomved message
   */
  @Delete('/:user_id/removeCustomer')
  @ApiOperation({ summary: 'Remove Customer from DB' })
  removeCustomer(@Param('user_id') id: number): Promise<void | string> {
    return this.customerService.removeCustomer(id);
  }
}
