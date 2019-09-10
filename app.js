import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import routes from './api/routes';

const app = express();

const uri = process.env.MBURI;

mongoose.connect(uri, { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('error', err));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/products', routes.product);
app.use('/orders', routes.order);

app.use((req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ error: { status: error.status, message: error.message } });
});

export default app;