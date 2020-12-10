import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider, enableStaticRendering } from 'mobx-react';
import App from './views/App';
import { createStoreMap } from './store/context';

// 让mobx在服务端渲染的时候不会重复数据变换
enableStaticRendering(true);

// {appStore: xx}
const ServerAPP = (stores, routerContext, url) => (
  <StaticRouter context={routerContext} location={url}>
    <App />
  </StaticRouter>
);

export default ServerAPP;

export {
  createStoreMap,
};
