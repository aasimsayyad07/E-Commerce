import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

/**
 * @class CreateProductDto
 * @description defined Body/Payload Sturutred which coming from client and validate based on class validators
 * which is used to create new product
 */

export class CreateProductDto {
  @ApiProperty({ description: 'The Name of Product' })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty({ description: 'The Description of Product' })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description: string;

  @ApiProperty({ description: 'The Price of Product' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The brand info of Product' })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({ description: 'The cateogry of Product' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ description: 'Total Avialble Stock Quanityty' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
