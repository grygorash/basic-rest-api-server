import { Router } from 'express';

import models from '../models';

const router = Router();
const { Order, Product } = models;

router.get('/', (req, res) =>
  Order
    .find()
    .select('-__v')
    .sort({ createdAt: -1 })
    .populate('product', '-__v')
    .then(orders =>
      res.status(200).json({ count: orders.length, orders }))
    .catch(err => res.status(400).json(err)));

router.post('/', (req, res) =>
  Product
    .findById(req.body.product)
    .then(() =>
      new Order({ ...req.body }).save())
    .then(order => res.status(201).json(order))
    .catch(err => res.status(400).json(err)));

router.get('/:orderId', (req, res) =>
  Order
    .findById(req.params.orderId)
    .populate('product', '-__v')
    .then(order => res.status(200).json(order))
    .catch(err => res.status(400).json(err)));

router.delete('/:orderId', (req, res) =>
  Order
    .remove({ _id: req.params.orderId })
    .then(() => res.status(200).json({ message: `Order ${_id} was deleted` }))
    .catch(err => res.status(400).json(err)));

export default router;