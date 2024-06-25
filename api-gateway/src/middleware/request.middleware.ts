import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const reqID = req.headers['x-request-id'] || uuidv4();
    req.headers['x-request-id'] = reqID;
    res.setHeader('x-request-id', reqID);
    console.log(reqID);

    next();
  }
}
