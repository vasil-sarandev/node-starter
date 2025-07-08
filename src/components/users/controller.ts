import { NextFunction, Request, Response } from 'express';
import { usersService } from './service';

class UsersController {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersService.getAll();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.getById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userObj = req.body;
      const user = await usersService.createUser(userObj);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
}

export const usersController = new UsersController();
