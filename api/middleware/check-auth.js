import { verify } from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.userData = verify(token, process.env.JWT_KEY);
    next();
  } catch (err) {
    return res.status(400).json({
      authorization: false,
    });
  }
};
export default checkAuth;