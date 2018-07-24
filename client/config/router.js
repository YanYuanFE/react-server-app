import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import Home from '../views/home';
import User from '../views/user';

export default () => [
  <Route path="/" render={() => <Redirect to="/home" />} exact key="index" />,
  <Route path="/home" component={Home} key="home" />,
  <Route path="/user" component={User} key="user" />,
];
