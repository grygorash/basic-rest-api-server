import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  passwordConfirm: {
    type: String,
    require: true,
  },
});

const User = model('User', userSchema);

export default User;