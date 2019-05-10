const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const serverRender = require('./utils/server.render');
const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
console.log('isDev:', isDev);

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
  const serverEntry = require('../dist/server.js');
  // serverEntry 是 default出的
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8');
  app.use('/public', express.static(path.join(__dirname, '../dist')));

  app.get('*', function (req, res, next) {
    serverRender(serverEntry, template, req, res).catch(next);
  });
} else {
  const devStatic = require('./utils/dev.static');
  devStatic(app);
}

app.use(function (error, req, res, next) {
  console.log(error);
  res.status(500).send(error);
});

app.listen(3333, function () {
  console.log('server is listening on 3333');
});
