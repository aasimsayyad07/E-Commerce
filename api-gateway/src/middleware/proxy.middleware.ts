import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as dotenv from 'dotenv';

dotenv.config();

const routes = {
  '/products': process.env.PRDODUCT_URL,
  '/customer': process.env.CUSTOMER_URL,
  '/orders': process.env.ORDER_URL,
  '/notification': process.env.NOTFICATION_URL,
};

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const route = Object.keys(routes).find((r) => req.url.startsWith(r));
    if (route) {
      const target = routes[route];

      createProxyMiddleware({ target, changeOrigin: false })(req, res, next);
    } else {
      next();
    }
  }
}
