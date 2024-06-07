import { IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';

/**
 * @description Create new customer Information DTO
 */
export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile_number: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
