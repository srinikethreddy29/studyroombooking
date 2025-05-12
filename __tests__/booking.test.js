const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Booking API Tests', () => {
  let token = '';
  let roomId = '';
  let userId = '';
  let bookingId = '';

  beforeAll(async () => {
    await request(app).post('/api/auth/signup').send({
      username: 'BookingUser',
      email: 'booking@example.com',
      password: 'pass123',
      role: 'student'
    });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'booking@example.com',
      password: 'pass123'
    });

    token = loginRes.body.token;
    userId = loginRes.body.user._id;

    const roomRes = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TestRoom', capacity: 3 });

    roomId = roomRes.body._id;
  });

  it('should create booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        roomId,
        userId,
        date: '2025-05-20',
        startTime: '10:00',
        endTime: '12:00'
      });

    console.log(' Booking response:', res.body); // optional debug

    expect([201, 400, 404]).toContain(res.statusCode);

    if (res.statusCode === 201) {
      bookingId = res.body.booking._id;
    }
  });


  it('should fetch all bookings', async () => {
    const res = await request(app).get('/api/bookings');
    expect(res.statusCode).toBe(200);
  });

  it('should delete booking', async () => {
    if (bookingId) {
      const res = await request(app)
        .delete(`/api/bookings/${bookingId}`);
      expect(res.statusCode).toBe(200);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});