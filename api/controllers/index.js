import {
  orders_get,
  orders_post,
  single_order_delete,
  single_order_get,
} from './orders';
import {
  products_get,
  products_post,
  single_product_delete,
  single_product_get,
  single_product_patch,
} from './products';
import {
  user_signin,
  user_signup,
  users_get,
  single_user_delete,
} from './users';

export const ordersController = {
  orders_get,
  orders_post,
  single_order_get,
  single_order_delete,
};

export const productsController = {
  products_get,
  products_post,
  single_product_get,
  single_product_patch,
  single_product_delete,
};

export const usersController = {
  users_get,
  user_signup,
  user_signin,
  single_user_delete,
};