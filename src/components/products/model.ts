import { model, Schema } from 'mongoose';

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  ownerId: string;
}

const productSchema = new Schema<IProduct>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    validate: {
      validator: val => {
        return val.length > 3;
      },
      message: 'Product name must be more than 3 characters',
    },
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
});

export const Product = model('Product', productSchema);
