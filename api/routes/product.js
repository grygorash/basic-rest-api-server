import { Router } from 'express';
import multer from 'multer';

import checkAuth from '../middleware/check-auth';
import { productsController } from '../controllers';

const router = Router();
const { products_get, products_post, single_product_get, single_product_patch, single_product_delete } = productsController;

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

router.get('/:page&:perPage', products_get);

router.post('/', checkAuth, upload.array('productImage'), products_post);

router.get('/:productId', single_product_get);

router.patch('/:productId', checkAuth, single_product_patch);

router.delete('/:productId', checkAuth, single_product_delete);

export default router;