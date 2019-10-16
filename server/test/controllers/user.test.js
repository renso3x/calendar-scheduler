const request = require('supertest-as-promised');
const server = require('../../index');
const db = require('../../config/db');

const testHelpers = require('../utils/helpers');

describe('User', () => {
  describe('/POST users', () => {
    it('should create new user', async () => {
      const body = {
        email: 'john@doe.com',
        password: '123'
      };
      const res = await testHelpers.withLogin(
        request(server)
          .post('/v1/user/register')
          .send(body)
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });

  //   describe('/GET users', () => {
  //     it('should get all users', async () => {
  //       await testHelpers.generateUsers();
  //       const user = await testHelpers.getOneRandomUser();
  //       const res = await testHelpers.withLogin(
  //         request(server).get('/v1/users'),
  //         { name: user.name, password: user.password }
  //       );
  //       expect(res.status).toBe(200);
  //       expect(res.body.users.length).toEqual(2);
  //     });
  //   });
});
