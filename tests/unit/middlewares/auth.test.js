const {User} = require('../../../models/users');
const auth = require('../../../middleware/auth');
const mongoos = require('mongoose');


describe('AUHT MIDDLEWARE', () => {
    it('should return req.user with the payload if a valid JWT', () => {
        const user = {_id: mongoos.Types.ObjectId(), isAdmin: true};
        const token = new User().generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };

        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(req.user).toBeDefined();
    });
});