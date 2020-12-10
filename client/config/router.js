import React from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from '../views/home';
import User from '../views/user';

const Routes = () => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/home" />} exact />
    <Route path="/home" component={Home} />
    <Route path="/user" component={User} />
  </Switch>
);

export default Routes;
