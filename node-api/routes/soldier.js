const express = require('express');

const soldierRouter = express.Router();

soldierRouter.get('/api/soldiers', (req, res) => res.send('Returns all Soldiers'));

soldierRouter.post('/api/soldiers', (req, res) => {
	res.status(201);
	return res.send('Creates Soldier')
});

soldierRouter.route('/api/soldiers/:id')
	.get((req, res) => res.send(`Return soldier with ID: ${req.params.id}`))
	.put((req, res) => res.status(201).send(`Update soldier with ID: ${req.params.id}`))
	.delete((req, res) => res.status(204).send())

module.exports = { soldierRouter };
