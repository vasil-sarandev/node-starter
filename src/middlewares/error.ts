import { KAFKA_ERRORS_TOPIC, kafka } from '@/lib/kafka';
import { Request, Response, NextFunction } from 'express';

const UNEXPECTED_ERROR_MSG = 'An unexpected error has ocurred.';

export interface IAppError extends Error {
  status: number;
}

export class AppError extends Error implements IAppError {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next();
  }
  const status = err.status ?? 500;
  const message = err.message ?? UNEXPECTED_ERROR_MSG;

  const errObj = { status, message };
  kafka.send({
    topic: KAFKA_ERRORS_TOPIC,
    messages: [{ value: JSON.stringify(errObj) }],
  });

  res.status(status).json({ message });
};
