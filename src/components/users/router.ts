import { Router } from 'express';
import { usersController } from './controller';

export const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getById);
usersRouter.post('/', usersController.createUser);
