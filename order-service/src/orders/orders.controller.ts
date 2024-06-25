import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersProducerService } from './ordersProducer.service';
import { AddOrderDto } from 'src/orders/dto/add-order.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrdersConsumerService } from './ordersConsumer.service';
import { Request } from 'express';
import { JwtAuthguard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthguard)
@ApiBearerAuth()
@ApiTags('Products')
@Controller('/orders')
export class OrdersController {
  constructor(
    private ordersProducerService: OrdersProducerService,
    private orderCoumsumerService: OrdersConsumerService,
  ) {}

  /**
   * @function addOrder
   * @description place new order in Queue - call OrderSerivce
   * @param addOrderDto
   * @returns Order Confirmation Message
   */
  @Post('/placeOrder')
  @ApiOperation({ summary: 'Add New Order' })
  addOrder(@Req() req: Request, @Body() addOrderDto: AddOrderDto) {
    const token = req.headers['authorization'];
    return this.ordersProducerService.placedOrder(addOrderDto, token);
  }

  /**
   * @function handleOrder
   * @description Trigger event which consume data from RabbitMQ Queue - call OrderSerivce
   * @param addOrderDto
   * @returns add Order details
   */
  @EventPattern('order-placed')
  handleOrder(@Payload() data: any) {
    const { orderData, email, headers } = data;
    const authorizationHeader = headers.authorization;
    return this.orderCoumsumerService.handleAddOrder(
      orderData,
      email,
      authorizationHeader,
    );
  }

  /**
   * @function getAllOrders
   * @description get All orders information from database - call OrderSerivce
   * @returns All Order Information
   */
  @Get('/getAllOrders')
  @ApiOperation({ summary: 'Get All Order Details' })
  getAllOrders(@Req() req: Request) {
    const requestId = req.headers['x-request-id'];
    console.log(requestId);
    return this.ordersProducerService.getAllOrders();
  }

  /**
   * @function updateStatus
   * @description update status of Order - call OrderProducerSerivce
   * @param query as orderID
   * @returns newly updated order details
   */
  @Put('/:orderID/status')
  @ApiOperation({ summary: 'Update order Stauts from pending to proceesing' })
  updateStatus(
    @Param('orderID', ParseUUIDPipe) param: string,
    @Body() paymentDetails: Record<string, string>,
  ) {
    return this.ordersProducerService.updateStatus(param, paymentDetails);
  }

  /**
   * @function getOrderDetailsByID
   * @description get order details for particluar order id - call OrderProducerSerivce
   * @param query as orderID
   * @returns Order details with parictuar order ID
   */
  @Get('/:orderID/orderDetails')
  @ApiOperation({ summary: 'Get Partiuclar Order Details using Order ID' })
  getOrderDetailsByID(@Param('orderID', ParseUUIDPipe) param: string) {
    return this.ordersProducerService.getOrderDetailsByID(param);
  }
}
