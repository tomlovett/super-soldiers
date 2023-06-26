const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')
const secret = require('../../config').secret
const auth = {}


auth.authHeaders = user => ({ authorization: `Token ${user.generateJWT()}` })

module.exports = auth
