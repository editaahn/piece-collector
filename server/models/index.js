const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Diary = require("./diary")(sequelize, Sequelize);
db.Song = require("./song")(sequelize, Sequelize);
db.Color = require("./color")(sequelize, Sequelize);

db.User.hasMany(db.Diary);
db.Diary.belongsTo(db.User);

db.Diary.hasOne(db.Color);

db.Diary.belongsToMany(db.Song, { through: 'DiarySong' });
db.Song.belongsToMany(db.Diary, { through: 'DiarySong' });

module.exports = db;