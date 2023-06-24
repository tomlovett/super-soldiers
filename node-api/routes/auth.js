const jwt = require('express-jwt')
const secret = require('../config').secret

function getToken(req) {
  const { authorization } = req.headers

  if (!authorization) { return null }

  const splitHeader = authorization.split(' ')

  return splitHeader[0] === 'Token' ?  splitHeader[1] : null
}

const auth = {
  required: jwt({
    secret,
    getToken,
  }),
  optional: jwt({
    secret,
    getToken,
    credentialsRequired: false,
  }),
}

module.exports = auth
