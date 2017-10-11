
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import Auth from '../middleware/Auth';
import db from '../models';
import helper from './helper';


const UsersController = {
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
    })).catch((error) => {
      res.status(500).json({
        msg: 'Internal server error'
      })
    });
  },


  /**
   * signUp - Create a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  signUp(req, res) {
    const { email, password, username, phoneNumber } = req.body;
    if(email !== undefined && password !== undefined && username !== undefined && phoneNumber !== undefined) {
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
      }).catch(err => helper.handleError(err, res));
    } else {
      res.status(400).json({ msg: 'Username, password, email and phoneNo required'})
    }

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
    }).catch((err =>  helper.handleError(err, res)));
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
  },
/**
   * Send mail to reset user password
   * @method
   * @memberof UserController
   * @returns {function} Express middleware function which sends
   * a password reset mail to user
   */
  forgotPassword(req, res) {
    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if(user) {
        const token = Auth.generateToken(user);
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false,
          auth: {
            user: 'noreply.mypostit@gmail.com',
            pass: process.env.PASSWORD
          },
          tls: {
          }
        });
        const mailOptions = {
          from: 'noreply.postitapp@gmail.com',
          to: req.body.email,
          subject: 'Reset Password',
          html: `<p>You have received this mail because you asked to reset your account on PostIt. Please
          <a href="https://${process.env.SITE_URL}/reset-password?secret=${token}">Click here</a> to begin the process</p><br />
          <p>Please ignore this mail if you did not make this request.</p>
          <p>Note: This link will expire after one hour</p>`,
        };
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            return res.status(501).json({
              msg: 'Failure delivery'
            });
          }
          return res.status(200).json({
            msg: 'Please check your mail for the reset link!'
          });
        })
      } else {
        res.status(404).json({
          msg: 'User with email not found'
        })
      }
    })
  },
/**
   * reset user password
   * @method
   * @memberof UserController
   * @static
   * @returns {function} reset password
   */
  resetPassword(req, res) {
    const { newPassword, retypePassword, token} = req.body;
    if (newPassword === retypePassword) {
      jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decoded) => {
        if(error) {
          return res.status(401).json({
            msg: 'This link has expired or is invalid. Please try again'
          });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        db.Users.update({ password: hashedPassword }, {
          where: { email: decoded.email }
        }).then(() => {
          res.status(201).json({
            msg: 'password reset successful, Please login to continue!'
          });
        });
      });
    } else {
        res.status(400).json({
          msg: 'Password does not match'
        })
      }
  }
};


export default UsersController;
