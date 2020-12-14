const {
  Diary,
  Sequelize: { Op },
  Song,
  Color,
} = require("../../models");

const show = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const diary = await Diary.findOne({
    where: { id: req.params.id },
    include: [Song, Color],
  });

  if (!diary) {
    return res.status(404).end();
  }
  res.json(diary);
};

const create = async (req, res) => {
  const { date, title, article, songs, colorId } = req.body;
  if (!date) return res.status(400).end();

  Diary.create(
    {
      date,
      title,
      article,
      colorId,
      songs: songs.filter((song) => !song.hasOwnProperty("id")),
    },
    { include: [Song, Color] }
  )
    .then(async (diary) => {
      await diary.addSongs(
        songs.reduce((list, song) => {
          return song.hasOwnProperty("id") ? list.concat(song.id) : list;
        }, [])
      );
      return await diary.id;
    })
    .then((id) => {
      return Diary.findOne({
        where: { id },
        include: [Song],
      });
    })
    .then((diary) => {
      res.status(201).json(diary);
    })
    .catch((err) => {
      const DUPLICATION_ERROR_NUMBER = 1062;
      if (err.parent.errno === DUPLICATION_ERROR_NUMBER) {
        return res.status(409).end();
      }
      res.status(500).end();
    });
};

module.exports = { show, create };
