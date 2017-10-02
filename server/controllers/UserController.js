
import jwt from 'jsonwebtoken';
import Auth from '../middleware/Auth';
import db from '../models';
import helper from './helper';


const UsersController = {

  /**
   * showUsers
   * @desc gets details for all users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  showUsers(req, res) {
    const { username, limit, offset } = req.query;

    if (!req.query) {
      res.status(200).json([]);
    } else {
      db.Users.findAndCountAll({
        where: {
          username: {
            $iLike: `%${username}%`
          }
        },
        limit,
        offset,
        attributes: { exclude: ['password', 'salt', 'createdAt', 'updatedAt', 'verificationCode'] }
      })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(404).json({
            success: false,
            error
          });
        });
    }
  },
  /**
   * fetchUsers
   * @desc gets details for all users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  fetchUsers(req, res) {
    db.Users.findAll({
      attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
    }).then(users => res.json({
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
    const { email, password, username, phoneNumber } = req.body;
      db.Users.findOrCreate({
        where: {
          email
        },
        defaults: {
          username,
          password: helper.hashedPassword(password),
          phoneNumber
        }
      })
      .spread((user, created) => {
        if (created) {
          return res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: Auth.generateToken(user)
          });
        }
        return res.status(409).json({ msg: 'user already exist' });
      }).catch(err => res.status(400).json({ msg: err.errors[0].message }));
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
        res.status(200).json({
          msg: 'You have been loggedin successfully',
          token: Auth.generateToken(user)
        });
      } else {
        res.status(401).json({
          msg: 'incorrect Email and password'
        });
      }
    }).catch((err => res.json({ msg: err.errors[0].msg })));
  },
  /**
   * signOut - Log Out a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  signOut(req, res) {
    res.status(200).json({
      msg: 'User successfully logged out'
    });
  },

  googleSignIn(req, res) {
    const { username, email, password, phoneNumber} = req.body;
    db.Users.findOne({
      where: {
        email
      }
    }).then((user) => {
      if(user) {
        res.status(200).json({
          msg: 'You have been loggedin successfully',
          token: Auth.generateToken(user)
        });
      } else {
        db.Users.create({
          username,
          email,
          password: helper.hashedPassword(password),
          phoneNumber
        }).then((user) => {
          if (user) {
            res.status(201).json({
              msg: 'You have been loggedin successfully',
              token: Auth.generateToken(user)
            });
          }
        })
      }
    })
  }



};


export default UsersController;
