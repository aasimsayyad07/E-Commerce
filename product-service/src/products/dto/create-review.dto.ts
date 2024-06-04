import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * @class CreateReviewDto
 * @description defined Body/Payload Sturutred which coming from client and validate based on class validators
 * which is used to create review
 */

export class CreateReviewDto {
  @ApiProperty({ description: 'enter username as user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'how do you like serivce' })
  @IsString()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ description: 'enter your commmets' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
