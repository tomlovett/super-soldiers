// import express from 'express'
const express = require('express')

const app = express()

app.get('/api/ping', (req, res) => res.sendStatus(200))

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)

  res.json({'errors': {
    message: err.message,
    error: err
  }})
})

app.listen(3000, () => console.log('Super Soldiers API listening on port 3000'))
