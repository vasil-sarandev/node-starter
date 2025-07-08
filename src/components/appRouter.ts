import { Router } from 'express';
import { productsRouter } from './products/router';
import { usersRouter } from './users/router';

export const appRouter = Router();

appRouter.use('/products', productsRouter);
appRouter.use('/users', usersRouter);
