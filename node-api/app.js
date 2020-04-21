const express = require('express');
const mongoose = require('mongoose');

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
