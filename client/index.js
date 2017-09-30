import React from 'react';
import { render } from 'react-dom';
import jwtDecode from 'jwt-decode';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { setCurrentUser } from './actions/authActions';
import store from './store';
import setAuthorizationToken from './utils/setAuthorizationToken';
import App from './Component/App';
import routes from './routes';
import './assets/css/post.css';

const token = window.localStorage.getItem('tokenize');
if (token) {
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(jwtDecode(token)));
}
render(<Provider store={store}>
  <Router history={browserHistory} routes={routes} />
</Provider>, document.getElementById('app'));

