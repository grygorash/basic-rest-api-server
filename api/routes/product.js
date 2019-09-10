import { Router } from 'express';
import multer from 'multer';

import models from '../models';
import validateProductPost from '../../common/validation/product';

const router = Router();
const { Product } = models;
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only jpg and png image files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

router.get('/:page&:perPage', (req, res) => {
  const page = +req.params.page.split('=')[1] - 1;
  const perPage = +req.params.perPage.split('=')[1];
  Product
    .find()
    .select('-__v')
    .sort({ createdAt: -1 })
    .limit(perPage)
    .skip(perPage * page)
    .exec((err, products) =>
      Product
        .countDocuments()
        .exec((err, count) =>
          res.json({ count, products })));
});

router.post('/', upload.array('productImage'), (req, res) => {
  const { errors, isValid } = validateProductPost(req.body);
  if (!isValid) return res.status(400).json(errors);
  new Product({
    ...req.body,
    productImages: req.files.map(file => file.path),
  })
    .save()
    .then(product => res.json(product));
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  Product
    .findById(productId)
    .select('-__v')
    .then(product => res.json(product))
    .catch(() => res.status(404).json({ error: `No product found for ${productId}` }));
});

router.patch('/:productId', (req, res) => {
  const _id = req.params.productId;
  const { errors, isValid } = validateProductPost(req.body);
  if (!isValid) return res.status(400).json(errors);
  Product
    .update({ _id }, { $set: { ...req.body, updatedAt: new Date() } })
    .then(() => res.status(200).json({ message: `Product ${_id} was updated` }))
    .catch(err => res.status(400).json(err));

});

router.delete('/:productId', (req, res) => {
  const _id = req.params.productId;
  Product
    .remove({ _id })
    .then(() => res.status(200).json({ message: `Product ${_id} was deleted` }))
    .catch(err => res.status(400).json(err));
});

export default router;