const request = require('supertest');
const app = require('../server'); // Assuming server.js exports the express app
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Integration Tests', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ name: 'Test User', email: 'test@example.com', password: '123456', mobile: '1234567890' });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Test User');
    });

    it('should get all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
