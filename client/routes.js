import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Component/App';
import AuthenticationPage from './Component/AuthComponent/index';
import SideBarComponent from './Component/SideBarComponent/index';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={AuthenticationPage} />
    <Route path="/sidebar" component={SideBarComponent} />
  </Route>
);
