import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Component/App';
import AuthenticationPage from './Component/AuthComponent/index';
import Groups from './Component/Dashboard/Groups';
import Dashboard from './Component/Dashboard/Dashboard';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={AuthenticationPage} />
    <Route path="/dashboard" component={Groups} />
  </Route>
);
