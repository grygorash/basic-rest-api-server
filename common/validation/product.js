import Validator from 'validator';
import isEmpty from './is-empty';

const validateProductPost = data => {
  let errors = {}, { title, price } = data;
  title = !isEmpty(title) ? title : '';
  price = !isEmpty(price) ? price : '';

  !Validator.isLength(title, { min: 3, max: 30 }) ?
    errors.title = 'Title must be between 3 and 100 characters'
    : null;

  Validator.isEmpty(title) ? errors.title = 'Title field is required' : null;

  Validator.isEmpty(price) ? errors.price = 'Price field is required' : null;

  return { errors, isValid: isEmpty(errors) };
};

export default validateProductPost;