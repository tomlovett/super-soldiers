const { expect } = require('chai')
const { describe, it } = require('mocha')
const axios = require('axios')
const { faker } = require('@faker-js/faker')

const BASE_URL = 'http://localhost:3000/api'

describe('/api', () => {
  describe('/ping', () => {
    it('returns 200', async () => {
      await axios.get(`${BASE_URL}/ping`)
        .then((res) => { expect(res.status).to.equal(200) })
    })
  })

  describe('/echo', () => {
    const body = { homeCountry: faker.location.country() }

    it('returns req.body in the response', async () => {
      await axios.post(`${BASE_URL}/echo`, body)
        .then((res) => {
          expect(res.status).to.equal(200)
          expect(res.data.homeCountry).to.equal(body.homeCountry)
        })
    })
  })
})
