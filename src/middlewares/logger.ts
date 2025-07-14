import { KAFKA_LOGS_TOPIC, kafka } from '@/lib/kafka';
import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const msg = `RECEIVED ${req.method} @ ${req.url} / ${Date.now()}`;
  kafka.send({
    topic: KAFKA_LOGS_TOPIC,
    messages: [{ value: msg }],
  });
  console.log(msg);
  next();
};
