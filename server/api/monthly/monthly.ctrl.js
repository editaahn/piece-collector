const { Diary, Sequelize: { Op }, Song, Color } = require("../../models");

const index = async (req, res) => {
  if (!req.query.month || !req.query.year) {
    res.status(400).json([]);
    done();
  }

  const year = parseInt(req.query.year, 10);
  const month = parseInt(req.query.month, 10) - 1;

  const diaries = await Diary.findAll({
    where: {
      date: {
        [Op.gte]: new Date(year, month),
        [Op.lt]: new Date(year, month + 1),
      },
    },
    attributes: ["id", "date", "article"],
    include: [
      {
        model: Song,
        attributes: ["id"],
      },
      {
        model: Color,
        attributes: ["hex"],
      },
    ],
  });
  res.json(diaries);
};

module.exports = { index };
