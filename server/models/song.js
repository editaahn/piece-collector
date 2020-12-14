module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "song",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      released_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    }
  );