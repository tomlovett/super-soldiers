const expect = require('chai').expect;
const axios = require('axios');

const baseUrl = 'http://localhost:3000/api';

it('App', async () => {
	await axios.get(baseUrl + '/ping')
		.then(res => {
			expect(res.status).to.equal(200);
		});
})
