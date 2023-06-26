const { Factory }= require('fishery')
const { faker } = require('@faker-js/faker')
// const { userFactory } = require('./index')

const soldierFactory = Factory.define(({ sequence }) => ({
  id: sequence,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  nickname: faker.animal.bear(),
  nationality: faker.location.country(),
  gender: faker.person.sex(),
  isAlive: true,
  user: null,
  // user: userFactory.build(),
}))

module.exports = { soldierFactory }
