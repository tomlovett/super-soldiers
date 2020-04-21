const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { soldiers } = require('./routes/soldiers');

console.log('Starting Super Soldiers API...')

mongoose.connect('mongodb://localhost/super_soldiers_node');

app.all('*', (req, res, next) => {
	const { body, method, path } = req;

	console.log(`${method} ${path}`);
	if (body) { console.log(`Request body: ${body}`); }
	next();
});

app.get('/api/ping', (req, res) => res.sendStatus(200));
app.use(soldiers);

app.listen(3000, () => console.log('Super Soldiers API listening on port 3000'));
