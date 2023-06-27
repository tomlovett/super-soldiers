const express = require('express')
const cors = require('cors')
const debug = require('debug')
const expressWinston = require('express-winston')
const { Sequelize } = require('sequelize')

const { loggerOptions } = require('./config/config')

const app = express()
const debugLog = debug('app:')

app.use(express.json())
app.use(cors())

app.use(expressWinston.logger(loggerOptions))

const sequelize = new Sequelize('sqlite::memory', { logging: (msg) => debug('db:', msg) })
// eslint-disable-next-line no-console
sequelize.authenticate().then(() => console.log('Connection to SQLite established'))

app.get('/api/ping', (req, res) => res.sendStatus(200))
app.post('/api/echo', (req, res) => res.status(200).send(req.body))

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.status(err.status || 500)

  res.json({ errors: { message: err.message, error: err } })
})

app.listen(3000, () => {
  debugLog('Super Soldiers API listening on port 3000') // not working
  // eslint-disable-next-line no-console
  console.log('Super Soldiers API listening on port 3000')
})
