import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import App from './Component/App';
import routes from './routes';
import './assets/css/post.css';

const store = configureStore();
render(<Provider store={store} >
  <Router history={browserHistory} routes={routes} />
</Provider >, document.getElementById('app'));

