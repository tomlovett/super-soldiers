const express = require('express');
const app = express();
console.log('Starting Super Soldiers API...')

app.get('/api/ping', (req, res) => res.sendStatus(200));

const soldierRouter = express.Router();
soldierRouter.get('/api/', (req, res) => res.sendStatus(200));

app.listen(3000, () => console.log('Super Soldiers API listening on port 3000'));
