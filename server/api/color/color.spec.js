const request = require("supertest");
const should = require("should");
const app = require("../../app");

const models = require("../../models");
const { Color } = models;
const { colors } = require("../testData");

// test data
const requestUrl = "/color/list";
before(() => models.sequelize.sync({ force: true }));
before(async () => {
  await Color.bulkCreate(colors);
});

// test
describe("GET /color/list 는", () => {
  // test suite
  describe("성공 시", () => {
    it("color 데이터를 배열 형태로 반환한다", (done) => {
      request(app)
        .get(requestUrl)
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("color 데이터에 name, hex 값을 포함하여 반환한다.", (done) => {
      request(app)
        .get(requestUrl)
        .end((err, res) => {
          res.body[0].should.have.properties(["name", "hex"]);
          done();
        });
    });
  });
});

