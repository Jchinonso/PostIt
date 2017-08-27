import { browserHistory } from 'react-router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from '../constants/ActionTypes';

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

export function signOut() {
  return (dispatch) => {
    localStorage.removeItem('tokenize');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({ user: {}
    }));
  };
}

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

