const path = require('path');
const webpack = require('webpack');
const axios = require('axios');
const MemoryFS = require('memory-fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const serverRender = require('./server.render');
const serverConfig = require('../../config/webpack.config.server');

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data);
      })
      .catch(reject)
  })
}

const Module = module.constructor;
const NativeModule = require('module');
const vm = require('vm');

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} };
  const wrapper = NativeModule.wrap(bundle);
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m;
}

const mfs = new MemoryFS();

const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;

let serverBundle, createStoreMap;

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  // const m = new Module();
  // m._compile(bundle, 'server.js');
  const m = getModuleFromString(bundle, 'server.js');
  serverBundle = m.exports;
})

module.exports = function (app) {
  app.use('/public', createProxyMiddleware({
    target: 'http://localhost:8888'
  }));

  app.get('*', function (req, res, next) {
    if (!serverBundle) {
      return res.send('waiting for compile, refresh later');
    }
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res);
    }).catch(next);
  })
}
