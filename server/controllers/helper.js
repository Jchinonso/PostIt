import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET_TOKEN || 'Keep my secret';
const helper = {

    /** validate plain password against hashed password
     *
     * @param {object} user
     * @param {String} password
     *
     * @return {Boolean} return validity of the password
     */
  validatePassword: (user, password) => {
    return bcrypt.compareSync(password, user.password);
  },

  /** validate plain password against hashed password
   *
     * @param {String} password
     *
     * @return {Boolean} return validity of the password
     */
  hashedPassword: password => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),

    /**
   * Handle promise errors
   *
   * @param {Object} error error object
   * @param {Function} res server response function
   *
   * @returns {Function} function that displays an error message
   */
    handleError: (error, res)  => {
      return error.errors ?
        res.status(400).send({ message: error.errors[0].message }) :
        res.status(400).send({ message: error.message });
    }

};

export default helper;
