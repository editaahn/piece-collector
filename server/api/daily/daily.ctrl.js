const index = async (req, res) => {
  res.json({ year: req.query.year });
};

module.exports = { index };
