const { Color } = require("../../models");

const list = async (req, res) => {
  const colors = await Color.findAll({});
  res.json(colors);
};

module.exports = { list };
