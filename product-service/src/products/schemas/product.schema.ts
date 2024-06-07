import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Review, ReviewSchema } from './review.schema';
import { v4 as uuidv4 } from 'uuid';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type ProductsDocument = Products & Document;

@Schema()
export class Products extends Document {
  @ApiProperty({ description: 'Enter unique product id' })
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  @Type(() => String)
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ type: [ReviewSchema] })
  reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Products);
