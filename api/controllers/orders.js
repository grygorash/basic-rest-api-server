import { Order, Product } from '../models';

const orders_get = (req, res) =>
  Order
    .find()
    .select('-__v')
    .sort({ createdAt: -1 })
    .then(orders =>
      res.status(200).json({ count: orders.length, orders }))
    .catch(err => res.status(400).json(err));

const orders_post = (req, res) =>
  Product
    .findById(req.body.product)
    .then(() =>
      new Order({ ...req.body }).save())
    .then(order => res.status(201).json(order))
    .catch(err => res.status(400).json(err));

const single_order_get = (req, res) =>
  Order
    .findById(req.params.orderId)
    .populate('product', '-__v')
    .then(order => res.status(200).json(order))
    .catch(err => res.status(400).json(err));

const single_order_delete = (req, res) =>
  Order
    .remove({ _id: req.params.orderId })
    .then(() => res.status(200).json({ message: `Order ${_id} was deleted` }))
    .catch(err => res.status(400).json(err));

export { orders_get, orders_post, single_order_get, single_order_delete };