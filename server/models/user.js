module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nick: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    { timestamps: true }
  );
