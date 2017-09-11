import { browserHistory } from 'react-router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from '../constants/ActionTypes';

/**
 * create action:set current user
 * @functionsetCurrentUser
 * @param {object} user
 * @returns {object} action: type and user
 */
export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

/**
 * async helper function: log out user
 * @function logOutUser
 * @returns {function} asynchronous action
 */
export function signOut() {
  return (dispatch) => {
    window.localStorage.removeItem('tokenize');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({ user: {}
    }));
  };
}

/**
* async helper function: sign up user
* @function signUpUser
* @param {string} username
* @param {string} password
* @param {string} email
* @param {string} phoneNo
* @returns {function} asynchronous action
*/

export function signUp(user) {
  return dispatch => axios.post('/api/v1/user/signup', user)
    .then((response) => {
      const token = response.data.token;
      window.localStorage.setItem('tokenize', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    })
    .catch((error) => {
      throw (error);
    });
}

/**
 * async helper function: sign in user
 * @function signInUser
 * @param {string} username
 * @param {string} password
 * @returns {function} asynchronous action
 */

export function signIn(user) {
  return (dispatch => axios.post('/api/v1/user/signin', user)
    .then((response) => {
      const token = response.data.token;
      window.localStorage.setItem('tokenize', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    })
    .catch((error) => { throw error; }));
}

