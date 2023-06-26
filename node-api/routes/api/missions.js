const mongoose = require('mongoose')
const missions = require('express').Router()
const Mission = mongoose.model('Mission')
const auth = require('../auth')

missions.use(auth.optional)

missions.route('/')
  .get((req, res, next) => {
		// breaks if it gets past here
    Mission.find({ user_id: req.user.id })
      .then(missions => res.status(200).json(missions))
      .catch(next)
  })
  .post((req, res, next) => {
    const mission = new Mission(req.body)
    mission.user_id = req.user.id

    return mission.save()
      .then(missionDoc => res.status(201).json(missionDoc))
      .catch(next)
  })

missions.route('/:id')
	.all((req, res, next) => {
    Mission.findById(req.params.id).then(mission => {
      if (!mission) { return res.sendStatus(404) }
      if (req.user.id !== mission.user_id.toString()) { return res.sendStatus(401) }

      req.mission = mission

      return next()
    }).catch(next)
  })
  .get((req, res, next) => res.status(200).json(req.mission) )
  .put((req, res, next) => {
    req.mission.name = req.body.name
    return req.mission.save().then(() => res.sendStatus(204)).catch(next)
  })
  .delete((req, res, next) => req.mission.remove().then(() => res.sendStatus(204)).catch(next) )

module.exports = missions
