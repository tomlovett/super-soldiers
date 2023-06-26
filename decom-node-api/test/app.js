const expect = require('chai').expect
const axios = require('axios')

const baseUrl = 'http://localhost:3000/api'

describe('/api', () => {
  it('/ping returns 200', async () => {
    await axios.get(baseUrl + '/ping')
      .then(res => {
        expect(res.status).to.equal(200)
      })
  })
})
