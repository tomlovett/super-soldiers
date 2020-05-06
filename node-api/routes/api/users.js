const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');

router.post('/login', (req, res, next) => {
	const { email, password } = req.body;

	if (!email) { return res.status(422).json({ errors: {email: "can't be blank"}}); }
	if (!password) { return res.status(422).json({ errors: {password: "can't be blank"}}); }

	passport.authenticate('local', {session: false}, (err, user, info) => {
		if (err) { return next(err); }
		if (!user) { return res.status(422).json(info); }

		// TODO: JWT already generated in model, correct?
		user.authToken = user.generateJWT();
		return res.json({ user: user.serialize() });
	})(req, res, next);
});

router.post('/users', (req, res, next) => {
	// TODO: add frontend middleware that switches between camelCase and snake_case depending on server
	const { email, name, password, password_confirmation  } = req.body;
	if (password !== password_confirmation) {
		return res.status(422).json({ errors: {password: "must match confirmation"}})
	}

	const user = new User();

	user.email = email;
	user.name = name;
	user.setPassword(password)

	user.save().then(function() {
		return res.json({ user: user.serialize() })
	}).catch(next);
});

module.exports = router;
