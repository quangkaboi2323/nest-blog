import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from 'src/config/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!token)
      throw new HttpException(
        { error_code: '401', error_message: 'unauthorized' },
        401,
      );

    try {
      const payload = await jwt.verify(token, config.jwtKey);

      req.user = payload;
      req.body.user_created = req.body.user_updated = payload;
      req.body.created_time = req.body.updated_time = Date.now();
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        { error_code: '401', error_message: 'unauthorized' },
        401,
      );
    }

    next();
  }
}
