import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('customers')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique User ID' })
  user_id: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ description: 'Enter name of User first and last name' })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Email ID' })
  email: string;

  @ApiProperty({ description: 'Gender of User' })
  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @ApiProperty({ description: 'Mobile Number' })
  @Column({ type: 'varchar', length: 15 })
  mobile_number: string;

  @ApiProperty({ description: 'user name' })
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
