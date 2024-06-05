/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

/**
 * @class JwtAuthguard
 * @function canActivate
 * @description defined the methods to vefiy jwt token which coming from client along with request
 * @returns user authetication
 */

@Injectable()
export class JwtAuthguard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    try {
      request.user = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token has been expired or revoked.');
    }

    return true;
  }
}
