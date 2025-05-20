const request = require('supertest');
const app = require('../app');

describe('Auth API Tests', () => {
  const user = {
    username: 'TestUser',
    email: 'test@example.com',
    password: 'pass123',
    role: 'student'
  };
//
  it('should sign up', async () => {
    const res = await request(app).post('/api/auth/signup').send(user);
    expect([200, 201, 400]).toContain(res.statusCode);
  });

  it('should login', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});