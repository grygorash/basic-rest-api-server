import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
  product: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model('Order', orderSchema);

export default Order;