const sequelize = require("../models").sequelize;

module.exports = () => {
  const options = {
    // force: process.env.NODE_ENV === "test" ? true : false,
    force: false
  };
  return sequelize.sync(options);
};
