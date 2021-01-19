const local = require("./localStrategy");
// const kakao = require("./kakaoStrategy");
const { User } = require("../models");

module.exports = (passport) => {
  passport.serializeUser((user, done) => done(null, user.id)); // req.session 객체에 사용자 id를 저장

  passport.deserializeUser((id, done) =>
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err))
  ); // 모든 요청 시 실행. serializeUser에서 세션에 저장한 아이디로 DB에서 사용자 정보 조회

  local(passport);
  // kakao(passport);
};
