module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "diary",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      article: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );