import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TimezoneMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    process.env.TZ = 'UTC';
    next();
  }
}
