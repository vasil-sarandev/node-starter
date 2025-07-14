import { Types } from 'mongoose';
import { IProduct } from './model';
import { IProductRepository, productRepository } from './repository';
import { AppError } from '@/middlewares/error';
import { kafka, KAFKA_PRODUCTS_TOPIC } from '@/lib/kafka';

type IProductCreateObj = Omit<IProduct, '_id'>;

const sendProductCreatedMessage = (id: string, data: IProductCreateObj) => {
  kafka.send({
    topic: KAFKA_PRODUCTS_TOPIC,
    messages: [{ key: id, value: data.name }],
  });
};

class ProductsService {
  private productsRepository: IProductRepository;

  constructor(injectedProductRepository?: IProductRepository) {
    if (injectedProductRepository) {
      this.productsRepository = injectedProductRepository;
      return;
    }
    this.productsRepository = productRepository;
  }

  getAllProducts = async () => {
    const products = await this.productsRepository.getAllProducts();
    return products;
  };

  getProductById = async (id: string) => {
    const product = await this.productsRepository.getProductById(id);
    if (!product) {
      throw new AppError(401, 'product not found');
    }
    return product;
  };

  createProduct = async (data: IProductCreateObj) => {
    const productId = new Types.ObjectId().toString();
    const product = await this.productsRepository.createProduct({
      ...data,
      _id: productId,
    });
    sendProductCreatedMessage(productId, data);
    return product;
  };

  deleteProductById = async (id: string) => {
    const resp = await this.productsRepository.deleteProduct(id);
    if (resp.acknowledged === false && resp.deletedCount === 0) {
      throw new AppError(401, 'product not found');
    }
    return resp;
  };
}

export const productsService = new ProductsService();
