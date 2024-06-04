// src/order/schemas/order.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ unique: true, default: uuidv4 })
  orderID: string;

  @Prop({ unique: true, default: uuidv4 })
  userid: string;

  @Prop([
    {
      productId: { type: Number, required: true, ref: 'Product' },
      quantity: { type: Number, required: true, min: 1 },
    },
  ])
  items: {
    productId: number;
    quantity: number;
  }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ type: Date, default: Date.now })
  orderDate: Date;

  @Prop({
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
