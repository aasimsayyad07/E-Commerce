import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

class OrderItemsDto {
  @ApiProperty({ description: 'Product ID' })
  @IsNumber()
  @IsPositive()
  productId: string;

  @ApiProperty({ description: 'Total Purchased Quantity' })
  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class AddOrderDto {
  @ApiProperty({ description: 'User ID' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Items Details' })
  @IsNotEmpty()
  items: OrderItemsDto[];

  @ApiProperty({ description: 'Amount Details' })
  @IsArray()
  totalAmount: number;
}
