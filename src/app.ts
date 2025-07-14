import express from 'express';
import { appRouter } from '@/components/app-router';
import { errorMiddleware } from '@/middlewares/error';
import { loggerMiddleware } from '@/middlewares/logger';
import { setupApp } from './lib/setup-app';

const createServerCallback = () => {
  const app = express();
  const port = parseInt(process.env.PORT as string);

  // parse jsons
  app.use(express.json());
  // parse forms
  app.use(express.urlencoded({ extended: true }));

  app.use(loggerMiddleware);
  app.use(appRouter);
  app.use(errorMiddleware);

  app.listen(port, '0.0.0.0', () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
};

setupApp(createServerCallback);
