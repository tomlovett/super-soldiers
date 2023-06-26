const { expect } = require('chai');
const axios = require('axios');

const Mission = require('../../models/Mission')

const { missionFactory, userFactory } = require('../factories')
const { authHeaders } = require('../utils/auth')

const basePath = 'http://localhost:3000/api';

let user = {}, mission = {}
user.generateJWT = () => `Token asbcdef`
// let user = {}
// const user = userFactory.build()
// const mission = missionFactory.build({ user })

describe('/missions', () => {
	describe('GET', () => {
		it('it returns all Missions for that user', async () => {
			await axios.get(`${basePath}/missions/`)
				.then(res => {
					expect(res.status).to.equal(200);
					// expect(res.data).to.
				})
		})
	})
})


describe('/missions/:id', () => {
	beforeEach(() => {
		mission = missionFactory.build({ user })
	})
	afterEach(async () => await Mission.deleteMany({})())

	// const mission = missionFactory.build()
	const config = {
		url: `${basePath}/missions/${mission.id}`,
		headers: authHeaders(user)
	}

  describe('GET', () => {
    it('returns that mission', async () => {
      await axios.get(config).then(res => {
        expect(res.status).to.equal(200)
        expect(res.data).to.equal(mission)
      })
    })
  })

  describe('PUT', () => {
    it('edits that mission and returns the updated object', async () => {
      await axios.put(config).then(res => {
        expect(res.status).to.equal(204)
        expect(res.data).to.equal(mission)
      })
    })
  })

	describe('DELETE', () => {
		it('deletes the mission', async () => {
			await axios.delete(config).then(res => {
				expect(res.status).to.equal(204)
				expect(Mission.findById(mission.id)).to.be.empty
			})
		})
	})
})
