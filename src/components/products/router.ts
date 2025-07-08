import { Router } from 'express';
import { productsController } from './controller';
import { authMiddleware } from '@/middlewares/auth';

export const productsRouter = Router();

productsRouter.post('/', authMiddleware, productsController.createProduct);
productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.delete('/:id', productsController.deleteProductById);
