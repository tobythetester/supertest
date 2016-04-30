var request = require('supertest');

var app = require("../../myApp/app.js").getApp;

describe('Testing internally hosted express api', function () {
  it('returns list of current postcodes', function (done) {
    request(app)
      .get('/postcodes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it("post a new post code", function (done) {
    var postcode = { postcode: 'SW1A 0AA' };

    request(app)
      .post("/postcodes")
      .send(postcode)
      .expect(200)
      .expect("SW1A 0AA is stored", done);
  });
});
