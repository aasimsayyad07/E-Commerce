// request-id.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToRpc().getContext();
    const requestId = req.headers['x-request-id'] || uuidv4();
    req.setMessage({
      ...req.getMessage(),
      properties: {
        ...req.getMessage().properties,
        headers: {
          ...req.getMessage().properties.headers,
          'x-request-id': requestId,
        },
      },
    });
    console.log(requestId);

    return next.handle();
  }
}
