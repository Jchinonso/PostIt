import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import App from './Component/App';

import './assets/js/modaljs';

render(<App />, document.getElementById('app'));

