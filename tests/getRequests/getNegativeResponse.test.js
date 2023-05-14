// const supertest = require("supertest");
// const { describe, test } = require("mocha");
// const { assert, expect } = require("chai");
// const allure = require("mocha-allure-reporter");

// const baseURL = "https://cvmtest.centura.org/";
// const wrongEndpoint = "//fake/wrong/endpoint";

// describe("negative external API response", () => {
//   test("should return 404", (done) => {
//     let createString =
//       "GIVEN I am on the home page of CVM, \n" +
//       "WHEN I upload a correct sheet and click to submit, \n" +
//       "THEN I can get success";

//     if (allure._allure.getCurrentSuite()) {
//       allure.description(createString);
//     }

//     supertest(`${baseURL}/${wrongEndpoint}`).end((err, res) => {
//       if (err) return done(err);

//       assert(res.status === 404, "Wrong endpoint!");

//       done();
//     });
//   });

//   test("response body should be null or its length equals zero", (done) => {
//     let createString =
//       "GIVEN I am on the home page of CVM, \n" +
//       "WHEN I upload a correct sheet and click to submit, \n" +
//       "THEN I can get success";
//     if (allure._allure.getCurrentSuite()) {
//       allure.description(createString);
//     }

//     supertest(baseURL)
//       .get(wrongEndpoint)
//       .end((err, res) => {
//         if (err) return done(err);

//         assert.isEmpty(res.body);

//         done();
//       });
//   });
// });

const request = require("supertest");
const expect = require("chai").expect;
const fs = require("fs");
require("mocha-allure-reporter");

describe("Submit Button Tests", () => {
  it("Happy path for a correct sheet and valid email", async () => {
    // let createString =
    //   "GIVEN I am on the home page of CVM, \n" +
    //   "WHEN I upload a correct sheet and click to submit, \n" +
    //   "THEN I can get success";
    // if (allure._allure.getCurrentSuite()) {
    //   allure.description(createString);
    // }

    fs.readFile("fixtures/sheets/valid-sheets.json", async (err, data) => {
      const response = await request("https://centura-nonprod-test1.apigee.net")
        .post("/cvm/api/v1/vaccine-compliance")
        .send({
          sheets: data,
          email: "rasul.uzalov@centura.org",
        })
        .expect(200);
    });
  });

  it("Happy path for a correct sheet with invalid records and valid email", async () => {
    // let createString =
    //   "GIVEN I am on the home page of CVM, \n" +
    //   "WHEN I upload a correct sheet with invalid records and click to submit, \n" +
    //   "THEN I can get success";
    // if (allure._allure.getCurrentSuite()) {
    //   allure.description(createString);
    // }
    fs.readFile(
      "fixtures/sheets/valid-sheets-invalid-data.json",
      async (err, data) => {
        const response = await request(
          "https://centura-nonprod-test1.apigee.net"
        )
          .post("/cvm/api/v1/vaccine-compliance")
          .send({
            sheets: data,
            email: "rasul.uzalov@centura.org",
          })
          .expect(200);
      }
    );
  });
});
