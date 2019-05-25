import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import App from './views/App';
import AppState from './store/app-state';

const initialState = window.__INITIAL__STATE__ || {}; // eslint-disable-line

ReactDOM.hydrate(
  <Provider appState={new AppState(initialState.appState)}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
); // hydrate
