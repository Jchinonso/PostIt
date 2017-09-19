import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Component/App';
import AuthenticationPage from './Component/AuthComponent/index';
import DashBoard from './Component/DashBoard/Index';

const onEnter = (next, replace, cb) => {
  if (localStorage.getItem('tokenize') !== null && next.location.pathname === '/') {
    replace('/dashboard');
  }
  if (localStorage.getItem('tokenize') === null && (next.location.pathname === ('/dashboard'))) {
    replace('/');
  }
  cb();
};

export default(
  <Route path="/" component={App}>
    <IndexRoute component={AuthenticationPage} />
    <Route path="/dashboard" component={DashBoard} onEnter={onEnter} />
  </Route>
);
