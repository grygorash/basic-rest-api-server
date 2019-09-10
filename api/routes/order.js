import { Router } from 'express';

import checkAuth from '../middleware/check-auth';
import { ordersController } from '../controllers';

const router = Router();
const { orders_get, orders_post, single_order_get, single_order_delete } = ordersController;

router.get('/', checkAuth, orders_get);

router.post('/', checkAuth, orders_post);

router.get('/:orderId', checkAuth, single_order_get);

router.delete('/:orderId', checkAuth, single_order_delete);

export default router;