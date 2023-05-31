import {StatusCodes} from 'http-status-codes';
import {NextFunction, Request, Response} from 'express';
import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';

export class AdminRouteMiddleware implements MiddlewareInterface {
  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.user.hasAdminRights) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'AdminRouteMiddleware'
      );
    }

    return next();
  }
}
