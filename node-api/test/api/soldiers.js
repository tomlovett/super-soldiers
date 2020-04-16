const { Soldier } = require('../../models/soldier.model');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');

describe('api/soldiers', () => {
	beforeEach(async () => {
		await Soldier.deleteMany({});
	});

	describe('GET /', () => {
		it('should return all soldiers', async () => {
			const soldiers = [
				{ firstName: 'tom', lastName: 'test', nationality: 'USA', gender: 'm', isAlive: true },
				{ firstName: 'timmmy', lastName: 'test', nationality: 'USA', gender: 'm', isAlive: true },
			];
			await Soldier.insertMany(soldiers);

			const res = await request(app.get('/api/soldiers'));
			expect(res.status).to.equal(200);
			expect(res.body.length).to.equal(2);
		});
	});

	describe('GET/:id', () => {
		it('returns the soldier', async () => {
			const soldier = new Soldier({
				firstName: 'tom',
				lastName: 'test',
				nationality: 'USA',
				gender: 'm',
				isAlive: true
			});
			await soldier.save();

			const res = await request(app).get(`/api/soldiers/${soldier._id}`);
			expect(res.status).to.equal(200);
			expect(res.body).to.have.property('lastName', soldier.lastName);
		});
	});

	it('with invalid id', async () => {
		const res = await request(app).get('api/users/2');
		expect(res.status).to.equal(400);
	});

	it('with model that does not exist', async () => {
		const res = await request(app).get('api/users/9000');
		expect(res.status).to.equal(404);
	});
});
