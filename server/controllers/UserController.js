
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import Auth from '../middleware/Auth';
import db from '../models';
import helper from './helper';


const UsersController = {

  /**
   * fetchUsers
   *
   * @desc gets details for all users
   *
   * @memberof UserController
   *
   * @param {Object} req, res
   *
   * @returns {void}
   */
  fetchUsers(req, res) {
    db.Users.findAll({
      attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
    }).then(users => res.status(200).json({
      users,
    })).catch((error) => {
      return res.status(500).json({
        message: 'Internal server error'
      })
    });
  },


  /**
   * signUp - Create a user
   *
   * @desc sign up a user
   *
   * @memberof UserController
   *
   * @param {Object} req, res
   *
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
        return res.status(409).json({ message: 'user already exist' });
      }).catch(err => {return helper.handleError(err, res)})
    } else {
      return res.status(400).json({ message: 'Username, password, email and phone Number required'})
    }
  },
 /**
   * signin - Log in a user
   *
   * @desc sign in an existing user
   *
   * @method
   *
   * @memberof UserController
   *
   * @param {Object} req, res
   *
   * @returns {void} Returns void
   */
  signIn(req, res) {
    const { email, password } = req.body;
    if(!email) {
      return res.status(400).json({msg: 'Username is required'})
    } else if (!password) {
      return res.status(400).json({
        message: 'Password is required'
      })
    } else {
    db.Users.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (user && helper.validatePassword(user, password)) {
        return res.status(200).json({
          message: 'You have been loggedin successfully',
          token: Auth.generateToken(user)
        });
      } else {
        return res.status(401).json({
          message: 'incorrect Email and password'
        });
      }
    }).catch((err => { return res.status(500).json({
       message: 'Internal Server Error'
      })}));
    }
  },
  /**
   * signOut - Log Out a user
   *
   * @desc sign out a user
   *
   * @method
   *
   * @memberof UserController
   *
   * @param {Object} req, res
   *
   * @returns {void} Returns void
   */
  signOut(req, res) {
    return res.status(200).json({
      message: 'User successfully logged out'
    });
  },

  /**
   * googleSignIn
   *
   * @desc signs user in via gmail
   *
   * @method
   *
   * @memberof UserController
   *
   * @param {object} req, res
   *
   * @returns {function} Express function that
   *
   */
  googleSignIn(req, res) {
    const { username, email, password, phoneNumber} = req.body;
    db.Users.findOne({
      where: {
        email
      }
    }).then((user) => {
      if(user) {
        return res.status(200).json({
          message: 'You have been loggedin successfully',
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
            return res.status(200).json({
              message: 'You have been loggedin successfully',
              token: Auth.generateToken(user)
            });
          }
        })
      }
    }).catch(err => { return res.status(500).json(
      {message: 'Internal Server Error'}
    )})
  },
/**
   * forgotPassword
   *
   * @desc Send mail to reset user password
   *
   * @method
   *
   * @memberof UserController
   *
   * @param {object} req, res
   *
   * @returns {function} Express function which sends
   *
   */
  forgotPassword(req, res) {
    const { email } = req.body;
    db.Users.findOne({
      where: {
        email
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
              message: 'Failure delivery'
            });
          }
          return res.status(200).json({
            message: 'Please check your mail for the reset link!'
          });
        })
      } else {
        return res.status(404).json({
          message: 'User with email not found'
        })
      }
    })
  },
  /** resetPassword
   * @desc reset user password
   *
   * @method
   *
   * @memberof UserController
   *
   * @param {object} req, res
   *
   * @returns {function} reset password
   */
  resetPassword(req, res) {
    const { newPassword, retypePassword, token} = req.body;
    if (newPassword === retypePassword) {
      jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decoded) => {
        if(error) {
          return res.status(401).json({
            message: 'This link has expired or is invalid. Please try again'
          });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        db.Users.update({ password: hashedPassword }, {
          where: { email: decoded.email }
        }).then(() => {
          return res.status(201).json({
            message: 'password reset successful, Please login to continue!'
          });
        });
      });
    } else {
        return res.status(400).json({
          message: 'Password does not match'
        })
      }
  }
};


export default UsersController;
