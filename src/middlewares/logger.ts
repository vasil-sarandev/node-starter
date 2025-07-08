import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`RECEIVED ${req.method} @ ${req.url} / ${Date.now()}`);
  next();
};
