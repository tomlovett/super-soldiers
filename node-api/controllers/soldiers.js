const { Soldier } = require('../models/soldier');
const soldierController = {};

// Verify params middleware

soldierController.getSoldiers = (req, res) => Soldier.find({})

soldierController.createSoldiers = (req, res) => Soldier.create(req.body)

soldierController.getSoldier = (req, res) => Soldier.find({ id: req.params.id })

soldierController.updateSoldier = (req, res) => Soldier.update({ req.params.id }, req.body);

soldierController.deleteSoldier = (req, res) => Soldier.deleteOne({ id: req.params.id })

module.exports = { soldierController };
