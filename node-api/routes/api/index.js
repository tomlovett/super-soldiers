const router = require('express').Router()

// router.use((req, res, next) => {
// 	// if headers present, decode and attach user to request
// }))

router.use('/', require('./users'))
router.use('/missions', require('./missions'))
router.use('/soldiers', require('./soldiers'))

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message

        return errors
      }, {})
    })
  }
  return next(err)
})

module.exports = router
