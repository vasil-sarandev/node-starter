import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from './errorMiddleware';

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface IAuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'Unauthenticated');
    }
    const user = jwt.verify(token as string, JWT_SECRET);
    req.user = user as JwtPayload;
    next();
  } catch (err) {
    if (err instanceof AppError) throw err; // 401 thrown err
    throw new AppError(403, 'Failed to authenticate');
  }
};
