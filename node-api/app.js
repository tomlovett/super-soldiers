const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const methods = require('methods');
const path = require('path');
const { soldiers } = require('./routes/soldiers');

console.log('Starting Super Soldiers API...')

const app = express();

app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/super_soldiers_node');

require('./models/User');
require('./models/Mission');
require('./config/passport');

app.use(require('./routes'));

app.get('/api/ping', (req, res) => res.sendStatus(200));
app.use(soldiers);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	res.json({'errors': {
		message: err.message,
		error: err
	}});
});

app.listen(3000, () => console.log('Super Soldiers API listening on port 3000'));
