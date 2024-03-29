const { Router } = require('express')

const soldiers = Router()

soldiers.get('/', (req, res) => res.send('Returns all Soldiers'))

soldiers.post('/', (req, res) =>  res.status(201).send('Creates Soldier')
)

soldiers.route('/:id')
  .get((req, res) => res.send(`Return soldier with ID: ${req.params.id}`))
  .put((req, res) => res.status(201).send(`Update soldier with ID: ${req.params.id}`))
  .delete((req, res) => res.sendStatus(204))

module.exports = soldiers
