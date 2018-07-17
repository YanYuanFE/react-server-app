import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import Home from '../views/home';
import User from '../views/user';

export default () => [
  <Route path="/" render={() => <Redirect to="/home" />} component={Home} exact />,
  <Route path="/home" component={Home} />,
  <Route path="/user" component={User} />,
];
