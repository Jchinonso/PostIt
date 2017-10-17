import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

import UserActions from '../../actions/UserActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Signup Action', () => {
    it('Should make a post request to sign up users', (done) => {
      moxios.stubRequest('/api/v1/user/signup', {
        status: 201,
        response: {
          message: 'Registration successful'
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'REGISTRATION_BEGINS'
        },
        {
          type: 'REGISTRATION_SUCCESSFUL',
          payload:
          {
            message: 'Registration successful'
          }
        }];
      store.dispatch(UserActions.registerUser('johndoe', 'johndoe@gmail.com',
        'abacus123', '07045324156'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
    it('Should dispatch appropraite action type if an unexpected error occured',
      (done) => {
        moxios.stubRequest('/api/v1/user/signup', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'REGISTRATION_BEGINS'
          },
          {
            type: 'REGISTRATION_REJECTED',
          }];
        store.dispatch(UserActions.registerUser('chinonso', 'chinonso@gmail.com',
          'abacus555', '97856432567'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
          });
        done();
      });
  });
  describe('Login Action', () => {
    it('Should make a post request to sign in users', (done) => {
      moxios.stubRequest('/api/v1/user/signin', {
        status: 200,
        response: {
          message: 'You are successfully logged in',
          user: {
            id: 1,
            user: 'johndoe',
            email: 'johndoe@gmail.com',
            token: 'something'
          }
        }
      });
      const store = mockStore({});
      const expectedAction = [
        {
          type: 'LOGIN_BEGINS'
        },
        {
          type: 'LOGIN_SUCCESSFUL',
          payload:
          {
            message: 'You are now logged in',
            user: {
              id: 1,
              user: 'johndoe',
              email: 'johndoe@gmail.com',
              token: 'something'
            }
          }
        }];
      store.dispatch(UserActions.loginUser('chinonso',
        'abacus555')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it('Should dispatch appropraite action type if an invalid user tries to sign in',
      (done) => {
        moxios.stubRequest('/api/v1/user/signin', {
          status: 400
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'LOGIN_BEGINS'
          },
          {
            type: 'LOGIN_UNSUCCESSFUL'
          }];
        store.dispatch(UserActions.loginUser('akinoau',
          'nigeria123')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch appropraite action type if there's an unexpected error",
      (done) => {
        moxios.stubRequest('/api/v1/user/signin', {
          status: 500
        });
        const store = mockStore({});
        const expectedAction = [
          {
            type: 'LOGIN_BEGINS'
          },
          {
            type: 'LOGIN_REJECTED'
          }];
        store.dispatch(UserActions.loginUser('jchinonso',
          'abacus555')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
