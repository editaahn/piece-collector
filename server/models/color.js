module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "color",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      hex: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      }
    },
    {
      timestamps: false,
    }
  );
