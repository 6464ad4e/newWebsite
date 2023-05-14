const supertest = require("supertest");
const { test, describe } = require("mocha");
const { assert, expect } = require("chai");
const path = require("path");
const fs = require("fs");

describe("data and email validation case", () => {
  test("SHOULD return positive response in case a valid email and an Excel sheet are provided", (done) => {
    fs.readFile(
      path.join(__dirname, "../../sheets/vendor-valid-v8.json"),
      (err, data) => {
        supertest("https://centura-nonprod-test1.apigee.net/")
          .post("/cvm/api/v1/vaccine-compliance")
          .send({
            sheets: data,
            email: "rasul.93@gmail.com",
          })
          .end((err, res) => {
            if (err) return done(err);

            done();
          });
      }
    );
  });
});
