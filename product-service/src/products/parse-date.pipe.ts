/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class parseDatePipe implements PipeTransform {
  transform(value: any) {
    const date = this.creatTimeStamp(value);
    if (!date || isNaN(+date)) {
      throw new BadRequestException('Invalid Date');
    }
    return date;
  }
  private creatTimeStamp(timestamp: string | number) {
    timestamp = +timestamp;
    const isSecond = !(timestamp > (Date.now() + 24 * 60 * 60 * 1000) / 1000);
    return isSecond ? new Date(timestamp * 1000) : new Date(timestamp);
  }
}
