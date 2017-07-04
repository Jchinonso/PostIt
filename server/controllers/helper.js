import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET_TOKEN || 'Keep my secret';
const helper= {

    /** validate plain password against hashed password
     * @param {object} user
     * @param {String} password
     * @return {Boolean} return validity of the password
     */
  validatePassword: (user, password) => {
    return bcrypt.compareSync(password, user.password);
  },
 
  /** generate token
     * @param {object} user
     * @return {object} return token
     */
  generateAuthToken: (user) => {
    return jwt.sign({
      UserId: user.id,
    }, secret, {
       expiresIn: 172800,
    });
  },

}

export default helper;