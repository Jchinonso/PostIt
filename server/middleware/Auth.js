import jwt from 'jsonwebtoken';
import db from '../models';


const secret = process.env.JWT_SECRET_TOKEN || 'Keep my secret';

const Auth = {
  verifyToken(request, response, next) {
    const token = request.body.token ||
      request.headers.authorization ||
      request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          response.status(401).send({
            message: 'Invalid token'
          });
        } else {
          request.decoded = decoded;
          next();
        }
      });
    } else {
      response.status(401).send({
        message: 'You are not authorized kindly login or sign up'
      });
    }
  },
  /**
   * generateToken generates token for authentication
   * @param {Object} user object
   * @returns {Object} jwt
   */
  generateToken(user) {
    return jwt.sign({
      username: user.username,
      userId: user.id,
      email: user.email,
    }, secret, { expiresIn: '2 days' });
  },
};
export default Auth;
