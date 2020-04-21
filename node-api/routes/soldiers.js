const express = require('express');

const soldiers = express.Router();

soldiers.get('/api/soldiers', (req, res) => res.send('Returns all Soldiers'));

soldiers.post('/api/soldiers', (req, res) => {
	res.status(201);
	return res.send('Creates Soldier')
});

soldiers.route('/api/soldiers/:id')
	.get((req, res) => res.send(`Return soldier with ID: ${req.params.id}`))
	.put((req, res) => res.status(201).send(`Update soldier with ID: ${req.params.id}`))
	.delete((req, res) => res.sendStatus(204))

module.exports = { soldiers };
