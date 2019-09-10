import { Router } from 'express';

import checkAuth from '../middleware/check-auth';
import { productsController } from '../controllers';
import upload from '../middleware/imageUpload';

const router = Router();
const { products_get, products_post, single_product_get, single_product_patch, single_product_delete } = productsController;

router.get('/:page&:perPage', products_get);

router.post('/', checkAuth, upload.array('productImages'), products_post);

router.get('/:productId', single_product_get);

router.patch('/:productId', checkAuth, upload.array('productImages'), single_product_patch);

router.delete('/:productId', checkAuth, single_product_delete);

export default router;