const mongoose = require('mongoose');

const soldierSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	lastName: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	nationality: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 255,
	},
	gender: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 1,
	},
	isAlive: {
		type: Boolean,
		required: true,
	}
});

module.exports.Soldier = mongoose.model('Agent', soldierSchema);
