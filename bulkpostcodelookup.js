var request = require('supertest')("http://api.postcodes.io");
var expect = require('chai').expect;

describe("Bulk post Code lookup", function () {

  it("returns an array of post codes", function (done) {
    request
      .post('/postcodes')
      .send({
        "postcodes": ["SW1A 0AA", "SW1A 0PW", "SW1A 1AA"]
      })
      .expect(200)
      .end(function (err, res) {
        for (i = 0; i < res.body.result.length; i++) {
          console.log(res.body.result[i].query)
          expect(res.body.result[i].query).to.equal(res.body.result[i].result.postcode)
        }
        done();
      });
  });

  it("returns null when an invalid post code is submitted", function (done) {
    request
      .post('/postcodes')
      .send({
        "postcodes": ["AB123"]
      })
      .expect(200)
      .end(function (err, res) {
        expect(res.body.result[0].result).to.equal(null)
        done();
      });
  });
  
    it("returns 400 when invalid json is submitted", function (done) {
    request
      .post('/postcodes')
      .send({
      })
      .expect(400)
      .end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal("Invalid JSON submitted. You need to submit a JSON object with an array of postcodes or geolocation objects")
        done();
      });
  })

});