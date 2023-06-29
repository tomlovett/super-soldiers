const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory:')
// const Mission = require('./Mission')
// const Soldier = require('./Soldier')

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
}, {
  // Other model options go here
})

// User.hasMany(Mission)
// User.hasMany(Soldier)

module.exports = User
