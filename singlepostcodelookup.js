var request = require('supertest')("http://api.postcodes.io");
var expect = require('chai').expect;

describe("Look up a specific post code", function () {

  it("locates correct post code when given valid post code", function (done) {
    request
      .get('/postcodes/' + "SW1A 1AA")
      .expect(200)
      .end(function (err, res) {
        expect(res.body.result.postcode).to.equal("SW1A 1AA");  
        done();    
      });
  })
  
  it("returns 400 when no post code is provided", function (done) {
    request
      .get('/postcodes/')
      .expect(200)
      .end(function (err, res) {
        expect(res.body.status).to.equal(400);
        done();
      });
  })
  
  it("returns 404 when no post code is provided", function (done) {
    request
      .get('/postcodes/' + 'AB123')
      .expect(200)
      .end(function (err, res) {
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal("Postcode not found")
        done();
      });
  })
});