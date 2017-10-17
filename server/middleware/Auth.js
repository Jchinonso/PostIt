import jwt from 'jsonwebtoken';
import db from '../models';


const secret = process.env.JWT_SECRET_TOKEN

const Auth = {

  /**
   * verify authentication token
   * @param {Object} user object
   * @returns {Object} message based on the response object
   */
  verifyToken(request, response, next) {
    const token = request.body.token ||
      request.headers.authorization ||
      request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          response.send({
            msg: 'Invalid token'
          });
        } else {
          request.decoded = decoded;
          next();
        }
      });
    } else {
      response.status(401).send({
        msg: 'You are not authorized kindly login or sign up'
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
    }, secret, { expiresIn: 60 * 60 * 24 });
  },
};
export default Auth;
