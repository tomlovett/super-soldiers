const { expect } = require('chai')
const axios = require('axios')
const { describe, it } = require('mocha')

const { User } = require('../../models')
const { userFactory } = require('../factories')

const BASE_PATH = 'http://localhost:3000/api/users'

describe('/users', () => {
  describe('POST', () => {
    it('creates a new user and returns an auth token', async () => {
      await axios.post(BASE_PATH)
        .then((res) => {
          expect(res.status).to.equal(201)
          // eslint-disable-next-line no-unused-expressions
          expect(res.body.auth_token).to.not.be.null

          User.count().then((userCount) => {
            expect(userCount).to.equal(1)
          })
        })
    })
  })
})

describe('/users/:id', () => {
  describe('GET', () => {
    it('returns the user', async () => {
      const user = userFactory.build()

      await axios.get(`${BASE_PATH}/${user.id}`)
        .then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body.email).to.equal(user.email)
        })
    })
  })

  describe('PUT', () => {
    it('updates the user', async () => {
      const user = userFactory.build()
      const CAPT_DESTRUCTO = 'Captain Destruct-o'

      await axios.put(`${BASE_PATH}/${user.id}`, { name: CAPT_DESTRUCTO })
        .then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal(CAPT_DESTRUCTO)

          User.findOne({ email: user.email }).then((userRecord) => {
            expect(userRecord.name).to.equal(CAPT_DESTRUCTO)
          })
        })
    })
  })
})
