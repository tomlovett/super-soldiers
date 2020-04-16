const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	email: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 255,
		unique: true
	},
});

module.exports.User = mongoose.model('Agent', userSchema);
