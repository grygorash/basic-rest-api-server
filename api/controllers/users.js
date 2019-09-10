import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../models';
import { validateUserSignin, validateUserSignup } from '../../common/validation/user';

const users_get = (req, res) =>
  User
    .find()
    .select('-__v')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err));

const user_signup = (req, res) => {
  const { name, email, password } = req.body;
  const { errors, isValid } = validateUserSignup(req.body);

  if (!isValid) return res.status(400).json(errors);

  User
    .findOne({ email })
    .then(user =>
      user ?
        res.status(409).json({ error: 'Email already exists' }) :
        bcrypt.hash(password, 10, (err, hash) => {
          err ?
            res.status(400).json({ error: err }) :
            new User({ name, email, password: hash })
              .save()
              .then(user => res.status(200).json(user))
              .catch(err => res.status(400).json(err));
        }));
};

const user_signin = (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateUserSignin(req.body);

  if (!isValid) return res.status(400).json(errors);

  User
    .findOne({ email })
    .then(user =>
      user ?
        bcrypt.compare(password, user.password, (err, result) => {
          const token = sign(
            { email: user.email, userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: '1h' },
          );
          result ?
            res.status(200).json({ authorization: true, token: `Bearer ${token}` }) :
            res.status(400).json({ error: 'Incorrect password' });
        }) :
        res.status(400).json({ error: 'No user found' }),
    )
    .catch(err => res.status(400).json(err));
};

const single_user_delete = (req, res) => {
  const _id = req.params.userId;
  User
    .findById(_id)
    .then(user =>
      user ?
        User
          .remove({ _id })
          .then(() => res.status(200).json({ message: 'User was deleted' })) :
        res.status(400).json({ error: 'User not found' }))
    .catch(err => res.status(400).json(err));
};

export { users_get, user_signup, user_signin, single_user_delete };