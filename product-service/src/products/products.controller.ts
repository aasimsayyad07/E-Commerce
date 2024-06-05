/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Put,
  ParseIntPipe,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  Req,
  HttpStatus,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Products, ProductSchema } from './schemas/product.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { parseDatePipe } from './parse-date.pipe';
import { CreateProductPipe } from './create-product-validate.pipe';
import { Request } from 'express';
import { JwtAuthguard } from 'src/auth/jwt.auth.guard';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/products')
@UseGuards(JwtAuthguard)
@UseInterceptors(LoggerInterceptor)
@ApiBearerAuth()
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  //REST API to Add Product in Product Database
  @Post('/addProduct')
  @ApiOperation({ summary: 'Add new Product with its information' })
  // @UsePipes(new CreateProductPipe(ProductSchema))
  @UsePipes(ValidationPipe)
  async addProduct(
    @Body()
    createProductDto: CreateProductDto,
  ): Promise<Products> {
    return this.productService.addProduct(createProductDto);
  }

  //REST API to Get All Products from Prdouct Database
  @Get('/getProducts')
  async getProducts() {
    return this.productService.getProducts();
  }

  //REST API to search Particular Product from Database
  @Get('/search')
  async search(@Query() query: Record<string, any>) {
    return this.productService.search(query);
  }

  //REST API to add review in Products
  @Post('/:name/addReviews')
  async addReview(
    @Param('name') param: string,
    @Body() crateReviewDto: CreateReviewDto,
  ) {
    return this.productService.addReview(param, crateReviewDto);
  }

  //REST API to update qunatity of product
  @Put('/:id/updateQuantity')
  async updateQuantity(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.productService.updateQuantity(id, quantity);
  }

  //Add Timestamp to update last updated Product Document
  @Post('/:id/updateTime')
  async updateTime(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body('timestamp', parseDatePipe) date: string,
  ) {
    console.log(date);
    return this.productService.addTimestamp(id, date);
  }

  //call external serivce which is down
  @Get('/external')
  async testService(@Req() req: Request) {
    try {
      const token = req.headers['authorization'];
      const data = await this.productService.executeProtectedFunction(token);
      return data;
    } catch (error) {
      return {
        message: 'External service is unavailable',
        Status: HttpStatus.SERVICE_UNAVAILABLE,
      };
    }
  }
}
