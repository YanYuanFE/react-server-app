const router = require('express').Router();
const axios = require('axios');
const querystring = require('querystring');

const baseUrl = 'http://cnodejs.org/api/v1';

module.exports = function (req, res, next) {
  const path = req.path;
  const user = req.session.user;
  const needAccessToken = req.query.needAccessToken;

  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  });
  if (query.needAccessToken) delete query.needAccessToken;

  axios(`${baseUrl}${req.path}`, {
    method: req.method,
    params: query,
    data: querystring.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
    .then(resp => {
      if (resp.status === 200) {
        res.send(resp.data);
      } else {
        req.send(resp.status).send(resp.data)
      }
    })
    .cathc(err => {
      if (err.response) {
        res.status(500).send(err.response.data)
      } else {
        res.status(500).send({
          success: false,
          msg: '未知错误'
        })
      }
    })
}
