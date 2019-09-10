import Validator from 'validator';
import isEmpty from './is-empty';

const validateUserSignup = data => {
  let errors = {}, { name, email, password, passwordConfirm } = data;

  name = !isEmpty(name) ? name : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';
  passwordConfirm = !isEmpty(passwordConfirm) ? passwordConfirm : '';

  if (!Validator.isLength(name, { min: 2, max: 30 })) errors.name = 'Name must be between 2 and 30 characters';
  if (Validator.isEmpty(name)) errors.name = 'Name field is required';
  if (!Validator.isEmail(email)) errors.email = 'Email is invalid';
  if (Validator.isEmpty(email)) errors.email = 'Email field is required';
  if (!Validator.isLength(password, { min: 6, max: 30 })) errors.password = 'Password must be at least 6 characters';
  if (Validator.isEmpty(password)) errors.password = 'Password field is required';
  if (!Validator.equals(password, passwordConfirm)) errors.passwordConfirm = 'Passwords must match';
  if (Validator.isEmpty(passwordConfirm)) errors.passwordConfirm = 'Confirm password field is required';
  return { errors, isValid: isEmpty(errors) };
};

const validateUserSignin = data => {
  let errors = {}, { email, password } = data;

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (!Validator.isEmail(email)) errors.email = 'Email is invalid';
  if (Validator.isEmpty(email)) errors.email = 'Email field is required';
  if (!Validator.isLength(password, { min: 6, max: 30 })) errors.password = 'Password must be at least 6 characters';
  if (Validator.isEmpty(password)) errors.password = 'Password field is required';
  return { errors, isValid: isEmpty(errors) };
};

export { validateUserSignup, validateUserSignin };