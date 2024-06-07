import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * @description Defined all Routes and there URL's
 */
const routes = {
  '/products': process.env.PRDODUCT_URL,
  '/customer': process.env.CUSTOMER_URL,
  '/orders': process.env.ORDER_URL,
  '/notification': process.env.NOTFICATION_URL,
};

/**
 * @class ProxyMiddleware
 * @description Create ProxyMiddleware which routes the all incoming request to appropriate Serivces
 */
@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const route = Object.keys(routes).find((r) => req.url.startsWith(r));
    if (route) {
      const target = routes[route];

      createProxyMiddleware({ target, changeOrigin: true })(req, res, next);
    } else {
      next();
    }
  }
}
