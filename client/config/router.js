import React from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from '../views/home';
import User from '../views/user';

export default () => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/home" />} exact />
    <Route path="/home" component={Home} />
    <Route path="/user" component={User} />
  </Switch>
);
