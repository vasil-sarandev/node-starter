import { Request, Response, NextFunction } from 'express';
import { productsService } from './service';
import { IAuthenticatedRequest } from '@/middlewares/auth';

class ProductsController {
  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productsService.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productsService.getProductById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  createProduct = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const product = await productsService.createProduct({ ...req.body, ownerId: req.user?.sub });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp = await productsService.deleteProductById(req.params.id);
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  };
}

export const productsController = new ProductsController();
