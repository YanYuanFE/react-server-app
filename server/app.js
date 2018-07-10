const express = require('express');
const ReactSSR = require('react-dom/server');
const serverEntry = require('../dist/server.js').default;
// serverEntry 是 default出的

const app = express();

app.get('*', function (req, res) {
  const appString = ReactSSR.renderToString(serverEntry);
  res.send(appString);
});

app.listen(3333, function () {
  console.log('server is listening on 3333');
});
