import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import App from './views/App';

const initialState = window.__INITIAL__STATE__ || {}; // eslint-disable-line

ReactDOM.hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
); // hydrate
