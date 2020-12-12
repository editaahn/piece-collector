module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "diary",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
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