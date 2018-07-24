const router = require('express').Router();
const axios = require('axios');

const baseUrl = 'http://cnodejs.org/api/v1';

router.post('/login', (req, res, next) => {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  })
    .then(response => {
      if (response.status === 200 && response.data.success) {
        res.session.user = {
          accessToken: req.body.accesstoken,
          loginName: response.data.loginname,
          id: response.data.id,
          avatarUrl: response.data.avatar_url
        }
        res.json({
          success: true,
          data: response.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        next(err)
      }
    })
})

module.exports = router;
