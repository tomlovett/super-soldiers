const express = require('express');
const app = express();
console.log('Starting Super Soldiers API...')

app.all('*', (req, res, next) => {
	const { body, method, path } = req;

	console.log(`${method} ${path}`);
	if (body) { console.log(`Request body: ${body}`); }
	next();
});

app.get('/api/ping', (req, res) => res.sendStatus(200));

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

app.use(soldierRouter);

app.listen(3000, () => console.log('Super Soldiers API listening on port 3000'));
