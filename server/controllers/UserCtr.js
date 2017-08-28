
import jwt from 'jsonwebtoken';
import Auth from '../middleware/Auth'
import db from '../models';
import helper from './helper';


const UsersCtrl = {

  /**
   * showUsers
   * @desc gets details for all users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  showUsers(req, res) {
    db.Users.findAll({
      where: {}
    }).then(users => res.send({
      users,
    }));
  },

  /**
   * signUp - Create a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  signUp(req, res) {
    db.Users.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        username: req.body.username,
        password: helper.hashedPassword(req.body.password),
        phoneNumber: req.body.phoneNumber
      }
    })
    .spread((user, created) => {
      if (created) {
        return res.status(201).send({
          username: user.username,
          email: user.email,
          phonenumber: user.phoneNumber,
          token: Auth.generateToken(user)
        });
      }
      return res.status(409).send({ message: 'user already exist' });
    }).catch(err => res.send(err));
  },
 /**
   * signin - Log in a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  signIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    db.Users.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (user && helper.validatePassword(user, password)) {
        res.status(200).send({
          message: 'You have been loggedin successfully',
          token: Auth.generateToken(user)
        });
      } else {
        res.status(403).send({
          message: 'incorrect Email and password'
        });
      }
    });
  },
  /**
   * signOut - Log Out a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  signOut(req, res) {
    res.status(200).send({
      message: 'User successfully logged out'
    });
  },

};


export default UsersCtrl;
