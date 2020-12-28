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
        title: "artist1 - song1",
        // artist: "artist1",
        released_date: new Date(1995, 9, 9),
      },
      {
        id: 1,
      },
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
      console.log(body);
      body.should.have.property("id");
    });
    it("옳은 날짜로 등록이 되었는지 반환한다", () => {
      body.should.have.properties({ date: "2020-12-04" });
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

describe("DELETE /daily/:id는", () => {
  describe("성공 시", () => {
    it("204를 반환한다.", (done) => {
      request(app).delete("/daily/1").expect(204).end(done);
    });
  });
  describe("실패 시", () => {
    it("파라미터 id값이 존재하지 않을 시 404을 반환한다.", (done) => {
      request(app).delete("/daily/1000").expect(404).end(done);
    });
    it("id가 숫자가 아닌 경우 400을 반환한다.", (done) => {
      request(app).delete("/daily/none").expect(400).end(done);
    });
  });
});

describe("PUT /daily/:id는", () => {
  const title = "새로운 test 제목",
    article = "새로운 수정 내용💜";
  describe("성공 시", () => {
    it("변경된 값을 응답한다.", (done) => {
      request(app)
        .put("/daily/2")
        .send({ title, article })
        .end((err, res) => {
          // console.log(res.body);
          res.body.should.have.property("title", title);
          done();
        });
    });
  });
  describe("실패 시", () => {
    it("파라미터 id값이 DB에 존재하지 않을 시 404을 반환한다.", (done) => {
      request(app).put("/daily/1000").send({ title }).expect(404).end(done);
    });
    it("id가 숫자가 아닌 경우 400을 반환한다.", (done) => {
      request(app).put("/daily/none").send({ title }).expect(400).end(done);
    });
    it("body에 property가 없는 경우 400을 반환한다.", (done) => {
      request(app).put("/daily/1").send({}).expect(400).end(done);
    });
  });
});

describe("PUT /daily/:id/song은", () => {
  const songs = [
    { id: 2 },
    {
      title: "Katy Perry - Smile",
      video_id: "vZA5heWazIQ",
      released_date: new Date(2020, 7, 14),
    },
    {
      title: "Katy Perry - Smile22",
      video_id: "vZA5heWazIQ",
      released_date: new Date(2020, 7, 14),
    },
  ];
  describe("성공 시", () => {
    it("변경된 값을 응답한다.", (done) => {
      request(app)
        .put("/daily/2/song")
        .send({ songs })
        .end((err, res) => {
          // console.log(res.body, res.status); 
          res.body.songs.should.have.length(4);
          done();
        });
    });
  });
  describe("실패 시", () => {
    it("파라미터 id값이 DB에 존재하지 않을 시 404을 반환한다.", (done) => {
      request(app).put("/daily/1000/song").send({ songs }).expect(404).end(done);
    });
    it("id가 숫자가 아닌 경우 400을 반환한다.", (done) => {
      request(app).put("/daily/none/song").send({ songs }).expect(400).end(done);
    });
    it("body에 property가 없는 경우 400을 반환한다.", (done) => {
      request(app).put("/daily/2/song").send({}).expect(400).end(done);
    });
  });
});
