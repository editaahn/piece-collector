const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

const join = async (req, res) => {
  const { name, nick, password } = req.body;

  if (!name || !nick || !password) {
    res.status(400).end();
  }

  try {
    const exUser = await User.findOne({ where: { name } });
    if (exUser) {
      throw new RangeError(409);
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      nick,
      password: hash,
    });
    res.status(201).json({ name: user.name });
  } catch (err) {
    res.status(err instanceof RangeError ? 409 : 500).end();
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    // local 로그인 전략 실행
    if (authError) {
      console.log(authError);
      return next(authError);
    }
    if (!user) {
      console.log(info);
      res.status(400).end();
    }
    return req.login(user, (loginError) => {
      // passport의 login 메서드를 통해 passport.serializeUser 호출
      if (loginError) {
        res.status(404).end();
      }
      return res.status(200).json({ message: "성공적으로 로그인되었습니다." });
    });
  })(req, res, next);
};

module.exports = { join, login };
