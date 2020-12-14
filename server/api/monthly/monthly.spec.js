const request = require("supertest");
const should = require("should");
const app = require("../../");

const models = require("../../models");
const { Diary, User, Color, Song } = models;
const { diaries, user, colors, songs } = require("../testData");

// test data
const requestUrl = "/monthly?year=2020&month=12";
before(() => models.sequelize.sync());
before(() => models.sequelize.sync({ force: true }));
before(async () => {
  await User.create(user);
  await Color.bulkCreate(colors);
  await Diary.bulkCreate(diaries);
  await Song.bulkCreate(songs);
  const diaryList = await Diary.findAll();
  await diaryList.forEach((diary) => diary.addSong(1));
});

describe("GET /monthly?year=&month=", () => {
  // test suite
  describe("성공 시", () => {
    it("일기 데이터를 배열 형태로 반환한다", (done) => {
      request(app)
        .get(requestUrl)
        .end((err, res) => {
          // console.log(res.body)
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("월별 일기 데이터를 개수만큼 반환한다", (done) => {
      request(app)
        .get(requestUrl)
        .end((err, res) => {
          res.body.should.be.lengthOf(2);
          done();
        });
    });
  });

  describe("실패 시", () => {
    it("쿼리스트링이 입력되지 않으면 실패를 반환한다", (done) => {
      request(app).get("/monthly?year=&month=").expect(400).end(done);
    });
  });
});
