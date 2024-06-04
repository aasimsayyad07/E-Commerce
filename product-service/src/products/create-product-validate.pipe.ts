/* eslint-disable prettier/prettier */
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { model, Schema } from 'mongoose';

export class CreateProductPipe implements PipeTransform {
  constructor(private schema: Schema) {}
  async transform(value: Record<string, any>) {
    const tempModel = model('ProductModel', this.schema);
    const document = new tempModel(value);

    try {
      await document.validate();
    } catch (error) {
      throw new BadRequestException('Validation failed: ' + error.message);
    }
    return value;
  }
}
