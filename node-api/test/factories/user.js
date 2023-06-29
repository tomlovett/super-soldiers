const { Factory } = require('fishery')
const { faker } = require('@faker-js/faker')

const userFactory = Factory.define(({ sequence }) => ({
  id: sequence,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  // missions: missionFactory.buildList(1),
  // soldiers: soldierFactory.buildList(2),
}))

module.exports = userFactory
