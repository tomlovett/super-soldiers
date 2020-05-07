const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UserSchema = new mongoose.Schema({
	email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
	name: String,
	hash: String,
	salt: String,
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken'});

// TODO: test replacing these methods with arrow functions
UserSchema.methods.validatePassword = function(password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.generateJWT = function() {
	const now = new Date();
	const exp = new Date(now);
	exp.setDate(now.getDate() + 60);

	return jwt.sign({
		id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(exp.getTime() / 1000),
	}, secret);
}

UserSchema.methods.serialize = function() {
	const { email, name } = this;
	const auth_token = this.generateJWT();

	return { email, name, auth_token };
}

mongoose.model('User', UserSchema);
