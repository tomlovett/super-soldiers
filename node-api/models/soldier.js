const mongoose = require('mongoose');
const { Schema, Types: { ObjectId } } = mongoose;

const Soldier = new Schema({
	id: ObjectId,
	firstName: String,
	lastName: String,
	nationality: String,
	gender: String,
	isAlive: Boolean,
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: Date,
	userId: ObjectId,
	nickname: String
});

module.exports = { Soldier };
