import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET_TOKEN || 'Keep my secret';
const helper = {

    /** validate plain password against hashed password
     * @param {object} user
     * @param {String} password
     * @return {Boolean} return validity of the password
     */
  validatePassword: (user, password) => {
    return bcrypt.compareSync(password, user.password);
  },

  hashedPassword: (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
};

export default helper;
