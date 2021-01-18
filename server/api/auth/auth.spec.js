const request = require("supertest");
const should = require("should");
const app = require("../../app");

const models = require("../../models");

before(() => models.sequelize.sync({ force: true }));

describe("POST /auth/join은", () => {
  const testData = {
    name: "testuser",
    password: "test",
    nick: "test",
    provider: "local",
  };

  describe("성공 시", () => {
    let body;
    before((done) => {
      request(app)
        .post("/auth/join")
        .send(testData)
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("등록된 name을 반환한다", () => {
      console.log(body);
      body.should.have.properties({ name: "testuser" });
    });
  });

  describe("실패 시", () => {
    it("name 프로퍼티 값이 없는 경우 400 반환", (done) => {
      const testDataLocal = {
        ...testData,
        name: null,
      };
      request(app).post("/auth/join").send(testDataLocal).expect(400).end(done);
    });

    it("password 프로퍼티 값이 없는 경우 400 반환", (done) => {
      const testDataLocal = {
        ...testData,
        password: null,
      };
      request(app).post("/auth/join").send(testDataLocal).expect(400).end(done);
    });

    it("중복된 name이 있는 경우 409 code를 반환한다.", (done) => {
      const testDataLocal = {
        ...testData,
        name: "testuser", // 이미 등록된 데이터
      };
      request(app).post("/auth/join").send(testDataLocal).expect(409).end(done);
    });
  });
});

describe("POST /auth/login은", () => {
  describe("성공 시", () => {
    const testDataLocal = {
      name: "testuser",
      password: "test",
    };
    
    it("200을 반환한다", (done) => {
      request(app)
        .post("/auth/login")
        .send(testDataLocal)
        .expect(200)
        .end((err, res) => {
          // console.log(res.body);
          done();
        });
    });
  });

  describe("실패 시", () => {
    it("요청한 name이 User에 존재하지 않는 경우 400 반환", (done) => {
      const testDataLocal = {
        name: "tsetste",
        password:
          "$2b$12$sSAUP3jJSMy5mrgydU9o7OLuvhyOSWjcD4sPAqQyG7PTK2X7GyHyu",
      };
      request(app)
        .post("/auth/login")
        .send(testDataLocal)
        .expect(400)
        .end(done);
    });

    it("password가 틀린 경우 400 반환", (done) => {
      const testDataLocal = {
        name: "testuser",
        password: "$2b$o7OLsHy",
      };
      request(app)
        .post("/auth/login")
        .send(testDataLocal)
        .expect(400)
        .end(done);
    });
  });
});
