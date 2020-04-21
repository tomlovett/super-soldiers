const expect = require('chai').expect;
const axios = require('axios');

const path = 'http://localhost:3000/api/soldiers';

describe('/soldiers', () => {
	describe('GET', () => {
		it('returns all Soldiers', async () => {
			await axios.get(path)
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.data).to.equal('Returns all Soldiers');
				});
		});
	});

	describe('POST', () => {
		it('creates a new Soldier and returns it', async () => {
			await axios.post(path)
				.then(res => {
					expect(res.status).to.equal(201);
					expect(res.data).to.equal('Creates Soldier');
				});
		});
	});
});

describe('/soldier/:id', () => {
	const soldierId = 1;
	const soldierPath = `${path}/${soldierId}`;

	describe('GET', () => {
		it('returns that soldier', async () => {
			await axios.get(soldierPath)
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.data).to.equal(`Return soldier with ID: ${soldierId}`);
				});
		});
	});

	describe('PUT', () => {
		it('updates that soldier', async () => {
			await axios.put(soldierPath)
				.then(res => {
					expect(res.status).to.equal(201);
					expect(res.data).to.equal(`Update soldier with ID: ${soldierId}`);
				});
		});
	});

	describe('DELETE', () => {
		it('deletes that soldier', async () => {
			await axios.delete(soldierPath)
				.then(res => expect(res.status).to.equal(204));
		});
	});
});
