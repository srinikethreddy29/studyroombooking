// test/bookings.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // this imports my app.js

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /bookings', () => {
  it('should return 200 and correct message', (done) => {
    chai.request(app)
      .get('/bookings')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Bookings route working fine!');
        done();
      });
  });
});