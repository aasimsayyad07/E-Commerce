/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { writeFile, writeFileSync } from 'fs';
import { join } from 'path';
import { Observable, tap } from 'rxjs';
import { callbackify } from 'util';

/**
 * @class LoggerInterceptor
 * @function intercept
 * @description Looged the User request info along with reponse time
 */

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const starttime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const resTime = endTime - starttime;

        this.loggedInFile(
          request.method,
          request.path,
          response.statusCode,
          resTime,
        );

        console.log(
          `${request.method} ${request.path} ${response.statusCode} ${resTime}ms`,
        );
      }),
    );
  }

  private async loggedInFile(
    reqMethod: any,
    reqPath: any,
    resStatusCode: any,
    resTime: any,
  ) {
    const LOGS_DIR = join(__dirname, `${Date.now()}.log.json`);

    const Data = {
      method: reqMethod,
      path: reqPath,
      status_code: resStatusCode,
      response_time: `${resTime}ms`,
    };

    try {
      //   writeFile(LOGS_DIR, JSON.stringify(Data));
      await writeFileSync(LOGS_DIR, JSON.stringify(Data));
    } catch (err) {
      return;
    }
  }
}
