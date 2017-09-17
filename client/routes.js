import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Component/App';
import AuthenticationPage from './Component/AuthComponent/index';
// import MainComponent from './Component/DashBoard/MainComponent/index';
import DashBoard from './Component/DashBoard/Index';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={AuthenticationPage} />
    <Route path="/dashboard" component={DashBoard} />
  </Route>
);
