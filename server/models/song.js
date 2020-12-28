module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "song",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 유튜브 데이터는 가수-제목 구분이 없음
      // artist: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      released_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      video_id: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    }
  );