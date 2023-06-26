const { Factory } = require('fishery')
const { faker } = require('@faker-js/faker')
const { userFactory } = require('./index')

const missionFactory = Factory.define(({ sequence }) => ({
  id: sequence,
  name: faker.science.chemicalElement().name ,
  user: null,
  // user: userFactory.build(),
  soldiers: []
}))

module.exports = { missionFactory }
