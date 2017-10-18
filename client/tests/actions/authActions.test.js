import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as authActions from '../../actions/authActions';
import * as types from '../../constants/ActionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const user = {
  userId: 1,
  email: 'johnDoe@gmail.com',
  username: 'jchinonso'
};

describe('Authentication Actions', () => {
  it('should create a setCurrentUser', () => {
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      user
    };
    const action = authActions.setCurrentUser(user);
    expect(action).toEqual(expectedAction);
  });
  it('should create a logError action', () => {
    const error = {
      msg: 'Incorrect email and password'
    };
    const expectedAction = {
      type: types.LOG_ERROR,
      error
    };
    const action = authActions.logError(error);
    expect(action).toEqual(expectedAction);
  });
});

describe('User async actions', () => {
  describe('async action signUpUser', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates AUTHENTICATION_SUCCESS when user signup is successful',
    () => {
      const { username, email, phoneNo, password } = user;
      nock('http://localhost')
      .post('/api/v1/user/signup')
      .reply(200, {
        user: { username, email, phoneNo, password },
        token: '12234432653553232'
      });
      const expectedActions = [
        {
          type: types.SET_CURRENT_USER,
          response: {
            user: { username, email, phoneNo, password },
            token: '12234432653553232'
          }
        },
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(
        authActions.signUp(username, password, email, phoneNo, password))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action signInUser', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates AUTHENTICATION_SUCCESS when user signin is successful',
    () => {
      const { email, password } = user;
      nock('http://localhost')
      .post('/api/v1/user/signin')
      .reply(200, {
        user: { email, password },
        token: '12234432653553232'
      });
      const expectedActions = [
        {
          type: types.SET_CURRENT_USER,
          response: {
            user: { email, password },
            token: '12234432653553232'
          }
        },
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(authActions
      .signIn(email, password))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });
});
