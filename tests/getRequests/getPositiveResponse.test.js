const supertest = require("supertest");
const { describe, test } = require("mocha");
const { assert, expect } = require("chai");

const baseURL = "https://cvmtest.centura.org/";
const endpoint1 =
  "/assets/documents/COVID%20Vaccine%20Mandate%20Submission_V8.xlsm";
const endpoint2 =
  "/assets/documents/Contractor%20Covid-19%20Vaccine%20Mandate%20Submission%20Template%20Update_V8.xlsm";

describe("positive external API response", () => {
  test("should return 200 over endpoint 1", (done) => {
    supertest(baseURL).get(endpoint1).expect(200, done);
  });

  test("should return 200 over endpoint 2", (done) => {
    supertest(baseURL).get(endpoint2).expect(200, done);
  });

  test("should return an Excel file over endpoint 1", (done) => {
    supertest(baseURL)
      .get(endpoint1)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);
        expect(res.header["content-type"]).to.equal("application/octet-stream");

        done();
      });
  });

  test("should return an Excel file over endpoint 2", (done) => {
    supertest(baseURL)
      .get(endpoint2)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);
        expect(res.header["content-type"]).to.equal("application/octet-stream");

        done();
      });
  });

  test("response body over endpoint 1 should not be null", (done) => {
    supertest(baseURL)
      .get(endpoint2)
      .expect("Content-Type", "application/octet-stream")
      .end((err, res) => {
        if (err) return done(err);

        assert.isNotEmpty(res.body);

        done();
      });
  });

  test("response body over endpoint 2 should not be null", (done) => {
    supertest(baseURL)
      .get(endpoint2)
      .expect("Content-Type", "application/octet-stream")
      .end((err, res) => {
        if (err) return done(err);

        assert.isNotEmpty(res.body);

        done();
      });
  });
});
