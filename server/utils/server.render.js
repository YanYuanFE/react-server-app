const asyncBootstrape = require('react-async-bootstrapper');
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const ReactDOMServer = require('react-dom/server');
const Helmet = require('react-helmet').default;

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson();
    return result;
  }, {});
};

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap;
    const createApp = bundle.default;
    // console.dir(bundle.default.toString())
    const routerContext = {};

    const stores = createStoreMap();
    const app = createApp(stores, routerContext, req.url);

    asyncBootstrape(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url);
        res.send();
        return;
      }
      const helmet = Helmet.rewind();
      const state = getStoreState(stores);

      const content = ReactDOMServer.renderToString(app);
      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
      });
      res.send(html);
      // res.send(template.replace('<!-- app -->', content));
      resolve();
    }).catch(reject);
  });
}
