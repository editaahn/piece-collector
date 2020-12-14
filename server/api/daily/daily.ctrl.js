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
  const { date, songs } = req.body;
  if (!date) return res.status(400).end();

  try {
    const diary = await Diary.create(
      {
        ...req.body,
        songs: songs.filter((song) => !song.hasOwnProperty("id")),
      },
      { include: [Song, Color] }
    );
    await diary.addSongs(
      songs.reduce((list, song) => {
        return song.hasOwnProperty("id") 
          ? list.concat(song.id) : list;
      }, [])
    );
    const result = await Diary.findOne({
      where: { id: diary.id },
      include: [Song],
    });
    res.status(201).json(result);
  } catch(err) {
    const ERROR_NUMBER = 1062;
    if (err.parent.errno === ERROR_NUMBER) {
      return res.status(409).end();
    }
    res.status(500).end();
  };
};

const destroy = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) return res.status(400).end();
  
  const destroyed = await Diary.destroy({
    where: { id }
  });
  res.status(
    destroyed ? 204 : 404
  ).end()
};

module.exports = { show, create, destroy };
