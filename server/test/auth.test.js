// const request = require('supertest');
// const jwt = require('jsonwebtoken');

// const db = require('../config/db');

// describe('Auth', () => {
//   let server;

//   // GET THE SERVER
//   beforeEach(async () => {
//     server = require('../index');
//   });

//   afterEach(async () => {
//     // MUST CLOSE THE SERVER IN EACH TEST
//     await server.close();
//     await db.close();
//   });

//   it('should return a valid JWT', () => {
//     const payload = {
//       userId: 1,
//       email: 'john@doe.com'
//     };
//     //generate token
//     const token = jwt.sign(
//       {
//         userId: payload.userId,
//         email: payload.email
//       },
//       'thisismysuperlongsscret',
//       { expiresIn: 60 * 60 }
//     );
//     //validated token
//     const decoded = jwt.verify(token, 'thisismysuperlongsscret');

//     expect(decoded).toMatchObject(payload);
//   });

//   it('should return error if email and password is invalid', async () => {
//     const res = await request(server)
//       .post('/api/auth/login')
//       .send({
//         email: '',
//         password: '123'
//       });
//     expect(res.statusCode).toEqual(500);
//   });

//   it('should return success with token if user credential is correct', async () => {
//     let userDetails = {
//       firstName: 'john',
//       lastName: 'doe',
//       email: 'john@doe.com',
//       password: '123'
//     };
//     const user = await db.models.user.create(userDetails);
//     const res = await request(server)
//       .post('/api/auth/login')
//       .send({
//         email: user.email,
//         password: user.password
//       });
//     expect(res.statusCode).toEqual(200);
//   });
// });
