const { createUser, getUsers, getUserById, deleteUser } = require('../controllers/userController');
const User = require('../models/User.model');
const httpMocks = require('node-mocks-http');

jest.mock('../models/User.model');

describe('User Controller Tests', () => {
    it('should create a new user', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: { name: 'Test User', email: 'test@example.com', password: '123456', mobile: '1234567890' }
        });
        const res = httpMocks.createResponse();

        User.create.mockResolvedValue(req.body);
        await createUser(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual(req.body);
    });

    it('should return all users', async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        const mockUsers = [{ name: 'User 1' }, { name: 'User 2' }];
        User.find.mockResolvedValue(mockUsers);

        await getUsers(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockUsers);
    });

    it('should return user by ID', async () => {
        const req = httpMocks.createRequest({ params: { id: '123' } });
        const res = httpMocks.createResponse();

        const mockUser = { name: 'Test User' };
        User.findById.mockResolvedValue(mockUser);

        await getUserById(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockUser);
    });

    it('should delete a user', async () => {
        const req = httpMocks.createRequest({ params: { id: '123' } });
        const res = httpMocks.createResponse();

        User.findByIdAndDelete.mockResolvedValue({});

        await deleteUser(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: 'User deleted successfully' });
    });
});
