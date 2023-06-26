const mongoose = require('mongoose')
const router = require('express').Router()
const passport = require('passport')
const User = mongoose.model('User')
const secret = require('../../config').secret
const auth = require('../auth')

router.post('/login', (req, res, next) => {
  const { email, password } = req.body

  if (!email) { return res.status(422).json({ errors: {email: 'can\'t be blank'}}) }
  if (!password) { return res.status(422).json({ errors: {password: 'can\'t be blank'}}) }

  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { return res.status(422).json(info) }

    // TODO: JWT already generated in model, correct?
    return res.json({ auth_token: user.generateJWT() })
  })(req, res, next)
})

router.post('/users', (req, res, next) => {
  // TODO: add frontend middleware that switches between camelCase and snake_case depending on server
  const { email, name, password, password_confirmation  } = req.body
  if (password !== password_confirmation) {
    return res.status(422).json({ errors: {password: 'must match confirmation'}})
  }

  const user = new User()

  user.email = email
  user.name = name
  user.setPassword(password)

  user.save().then(() => res.json({ auth_token: user.generateJWT() })).catch(next)
})

router.get('/self', auth.required, (req, res, next) => res.status(200).json(req.user) )

module.exports = router
