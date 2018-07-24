const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'server-app',
  resave: false,
  saveUninitialized: false,
  secret: 'react-server-app'
}));

app.use('/api/user', require('./utils/login'));
app.use('/api', require('./utils/proxy'));

app.use(favicon(path.join(__dirname, '../favicon.ico')));
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
