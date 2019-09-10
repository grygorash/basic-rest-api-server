import { Product } from '../models';
import validateProductPost from '../../common/validation/product';

const products_get = (req, res) => {
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
};

const products_post = (req, res) => {
  const { errors, isValid } = validateProductPost(req.body, req.files);
  if (!isValid) return res.status(400).json(errors);
  new Product({
    ...req.body,
    productImages: req.files.map(file => file.path),
  })
    .save()
    .then(product => res.json(product));
};

const single_product_get = (req, res) => {
  const { productId } = req.params;
  Product
    .findById(productId)
    .select('-__v')
    .then(product => res.json(product))
    .catch(() => res.status(404).json({ error: `No product found for ${productId}` }));
};

const single_product_patch = (req, res) => {
  const _id = req.params.productId;
  const { errors, isValid } = validateProductPost(req.body);
  if (!isValid) return res.status(400).json(errors);
  Product
    .update({ _id }, { $set: { ...req.body, updatedAt: new Date() } })
    .then(() => res.status(200).json({ message: `Product ${_id} was updated` }))
    .catch(err => res.status(400).json(err));
};

const single_product_delete = (req, res) => {
  const _id = req.params.productId;
  Product
    .remove({ _id })
    .then(() => res.status(200).json({ message: `Product ${_id} was deleted` }))
    .catch(err => res.status(400).json(err));
};

export { products_get, products_post, single_product_get, single_product_patch, single_product_delete };