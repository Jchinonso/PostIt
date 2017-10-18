import expect from 'expect';
import authReducer from '../../reducers/authReducer';
import {
  SET_CURRENT_USER
 } from '../../constants/actionTypes';

const initialState = {
  isAuthenticated: false, user: {}, errorMsg: ''
};
const user = {
  username: 'jchinonso',
  email: 'jchinonso@gmail.com',
  phoneNo: '00009992992',
};

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(initialState, {})).toEqual(initialState);
  });
  it('should handle set current user', () => {
    expect(
      authReducer(initialState, {
        type: SET_CURRENT_USER,
        user
      })
    ).toEqual({ errorMsg: '', isAuthenticated: true, user });
  });
});
