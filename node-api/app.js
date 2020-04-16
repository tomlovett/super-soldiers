const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
	.connect('mongodb://localhost/tddDB', {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log('Connected to MongoDB at mongodb://localhost/tddDB...')
	})
	.catch(e => {
		console.log('Failed to connect to MongoDB...', e);
		process.exit();
	});

const soldiersRouter = require('./routes/soldier.route');

// app.use('api/soldiers', soldiersRouter);

app.use((req, res, next) => next(createError(404)) );

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message  = err.message;

	// render error page
	res.status(err.status || 500);
	res.send(err);
});

module.exports = app;
