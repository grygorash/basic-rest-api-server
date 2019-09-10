import { model, Schema } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  productImages: [{
    type: String,
    required: true,
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = model('Product', productSchema);

export default Product;