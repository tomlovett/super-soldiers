const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { soldiers } = require('./routes/soldiers');

console.log('Starting Super Soldiers API...')

const app = express();

app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/super_soldiers_node');

app.all('*', (req, res, next) => {
	const { body, method, path } = req;

	console.log(`${method} ${path}`);
	if (body) { console.log(`Request body: ${body}`); }
	next();
});

require('./models/User');

app.get('/api/ping', (req, res) => res.sendStatus(200));
app.use(soldiers);

app.listen(3000, () => console.log('Super Soldiers API listening on port 3000'));
