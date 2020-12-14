const request = require("supertest");
const should = require("should");
const app = require("../../");

const models = require("../../models");
const { Diary, User, Color, Song, DiarySong } = models;
const { diaries, user, colors, songs } = require("../testData");

// test data
before(() => models.sequelize.sync({ force: true }));
before(async () => {
  await User.create(user);
  await Color.bulkCreate(colors);
  await Diary.bulkCreate(diaries);
  await Song.bulkCreate(songs);
  const diaryList = await Diary.findAll();
  await diaryList.forEach((diary) => diary.addSong(1));
});

// test
describe("GET /daily/:id는", () => {
  describe("성공 시", () => {
    it("주요 property들이 담겨 있는지 검증한다.", (done) => {
      request(app)
        .get("/daily/1")
        .end((err, res) => {
          // console.log(res.body)
          res.body.should.have.properties(["id", "songs", "color"]);
          done();
        });
    });
    it("id 파라미터에 맞는 값이 왔는지 검증한다.", (done) => {
      request(app)
        .get("/daily/1")
        .end((err, res) => {
          res.body.should.have.properties({ id: 1 });
          done();
        });
    });
  });

  describe("실패 시", () => {
    it("id 검색결과가 없는 경우 404를 반환한다.", (done) => {
      request(app).get("/daily/1000").expect(404).end(done);
    });
    it("id가 숫자가 아닌 경우 400을 반환한다.", (done) => {
      request(app).get("/daily/none").expect(400).end(done);
    });
  });
});

describe("POST /daily는", () => {
  const testData = {
    title: "새 일기",
    date: new Date(2020, 11, 4),
    article: "일기입니다.",
    songs: [
      {
        title: "song1",
        artist: "artist1",
        released_date: new Date(1995, 9, 9),
      }, {
        id: 1
      }
    ],
    colorId: 1,
  };
  describe("성공 시", () => {
    let body;
    before((done) => {
      request(app)
        .post("/daily")
        .send(testData)
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 id 객체를 반환한다", () => {
      console.log(body)
      body.should.have.property("id");
    });
    it("옳은 날짜로 등록이 되었는지 반환한다", () => {
      body.should.have.properties({ date: '2020-12-04' });
    });
  });

  describe("실패 시", () => {
    it("date 프로퍼티 값이 없는 경우 400 반환", (done) => {
      const testDataLocal = {
        ...testData,
        date: null,
      };
      request(app).post("/daily").send(testDataLocal).expect(400).end(done);
    });

    it("중복된 날짜가 있을 시 409 반환", (done) => {
      const testDataLocal = {
        ...testData,
        date: new Date(2020, 11, 1), // 이미 등록된 데이터
      };
      request(app).post("/daily").send(testDataLocal).expect(409).end(done);
    });
  });
});
