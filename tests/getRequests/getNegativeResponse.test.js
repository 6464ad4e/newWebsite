const supertest = require("supertest");
const { describe, test } = require("mocha");
const { assert, expect } = require("chai");

const baseURL = "https://cvmtest.centura.org/";
const wrongEndpoint = "//fake/wrong/endpoint";

describe("negative external API response", () => {
  test("should return 404", (done) => {
    supertest(baseURL)
      .get(wrongEndpoint)
      .end((err, res) => {
        if (err) return done(err);

        assert(res.status === 404, "Wrong endpoint!");

        done();
      });
  });

  test("response body should be null or its length equals zero", (done) => {
    supertest(baseURL)
      .get(wrongEndpoint)
      .end((err, res) => {
        if (err) return done(err);

        assert.isEmpty(res.body);

        done();
      });
  });
});
