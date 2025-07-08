import { DeleteResult } from 'mongoose';
import { IProduct, Product } from './model';

export interface IProductRepository {
  getAllProducts: () => Promise<IProduct[]>;
  getProductById: (id: string) => Promise<IProduct | null>;
  createProduct: (data: IProduct) => Promise<IProduct>;
  deleteProduct: (id: string) => Promise<DeleteResult>;
}

class ProductRepository implements IProductRepository {
  constructor() {}

  getAllProducts = async () => Product.find({}).lean();

  getProductById = async (id: string) => Product.findById(id).lean();

  createProduct = async (data: IProduct) => {
    const product = await new Product(data).save();
    return product;
  };

  deleteProduct = async (id: string) => Product.deleteOne({ _id: id }).lean();
}

export const productRepository = new ProductRepository();
