const express = require('express');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const app = express();
if (!isDev) {
  const serverEntry = require('../dist/server.js').default;
  // serverEntry 是 default出的
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
  app.use('/public', express.static(path.join(__dirname, '../dist')));

  app.get('*', function (req, res) {
    const appString = ReactDOMServer.renderToString(serverEntry);
    
    res.send(template.replace('<!-- app -->', appString));
  });
} else {
  const devStatic = require('./utils/dev.static');
  devStatic(app);
}




app.listen(3333, function () {
  console.log('server is listening on 3333');
});
