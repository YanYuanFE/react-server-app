import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Routes from '../config/router';

const App = () => (
  [
    <div key="menu">
      <Link to="/home">
        首页
      </Link>
      <Link to="/user">
        用户
      </Link>
    </div>,
    <Routes key="content" />,
  ]
);

export default hot(module)(App);
