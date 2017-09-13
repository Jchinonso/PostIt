import omit from 'omit';
/**
 *
 * @class Validation
 */
export default class Validation {
  /**
   *
   *
   * @param {Object} request request from client
   * @param {Object} response server response
   * @param {callback} next
   * @returns {json} returns the error (if there's any) in a JSON format
   * @memberof Validation
   */
  static validateSignUpInput(request, response, next) {
    request.checkBody('username', 'Username is required').notEmpty();
    request.checkBody('password', 'Password is required').notEmpty();
    request.checkBody('email', 'Invalid email').isEmail();
    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('phoneNumber', 'Phone number is required').notEmpty();

    /* eslint-disable no-useless-escape */
    request.checkBody('phoneNumber', 'Phone number must not be a string').matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    const errors = request.validationErrors();
    if (errors) {
      const unwanted = ['param', 'value', 'location'];
      const errorMsg = errors.map(omit(unwanted));
      return response.status(400).json(errorMsg);
    }
    return next();
  }

  /**
   *
   *
   * @param {Object} request request from client
   * @param {Object} response server response
   * @param {callback} next
   * @returns {json} returns the error (if there's any) in a JSON format
   * @memberof Validation
   */
  static validateSignInInput(request, response, next) {
    request.checkBody('email', 'Invalid email').isEmail();
    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('password', 'Password is required').notEmpty();

    const errors = request.validationErrors();
  
    if (errors) {
      const unwanted = ['param', 'value', 'location'];
      const errorMsg = errors.map(omit(unwanted));
      return response.status(400).json(errorMsg);
    }
    return next();
  }

  /**
   * @param {Object} request request from client
   * @param {Object} response server response
   * @param {callback} next
   * @returns {json} returns the error (if there's any) in a JSON format
   * @memberof Validation
   */
  static validateGroupInput(request, response, next) {
    request.checkBody('name', 'Group name is required').notEmpty();
    request.checkBody('description', 'description is required').notEmpty();

    const errors = request.validationErrors();
  
    if (errors) {
      const unwanted = ['param', 'value', 'location'];
      const errorMsg = errors.map(omit(unwanted));
      return response.status(400).json(errorMsg);
    }
    return next();
  }
}
