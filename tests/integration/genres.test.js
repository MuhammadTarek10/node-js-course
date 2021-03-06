const request = require('supertest');
const {Genre} = require('../../models/genres')
const {User} = require('../../models/users');

let server;

describe('/api/genres', () => {
    beforeEach(() => {server = require('../../index');});
    afterEach(async () => {
        server.close();
        await Genre.remove();
    });

    describe('GET /', () =>{
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name: "genre2"}
            ]);

            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1'));
            expect(res.body.some(g => g.name === 'genre2'));
        });
    });
   
    describe('GET /:id', () => {
        it('should return genre with specific id', async () => {
            const genre = new Genre({name: 'genre1'});
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        const exec = async () => {
            return await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({name});
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });

        it('should return 401 if the client not logged in', async () => {
            token = ''
            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if the genre is less than 5 character', async () => {
            name = '123';
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if the genre is more than 50 character', async () => {
            name = new Array(52).join('a');
            const res = await exec()

            expect(res.status).toBe(400);
        });

        it('should save the genre if valid', async () => {
            await exec();

            const genre = await Genre.find({name: 'genre1'});
            expect(genre).not.toBeNull();
        });

        it('should return the genre if valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });

    });
});


