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
      provider: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "local",
      },
      snsId: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    { timestamps: true, paranoid: true } // paranoid 설정 시, destroy 시 data를 직접 삭제하지 않고 deletedAt을 추가
  );
