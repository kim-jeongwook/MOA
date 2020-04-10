const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Member = require("./Member")(sequelize, Sequelize);
db.Room = require("./Room")(sequelize, Sequelize);
db.LoginHistory = require("./login_history")(sequelize, Sequelize);
db.RoomHistory = require("./room_history")(sequelize, Sequelize);
db.LoginSecret = require("./login_secret")(sequelize, Sequelize);
db.RoomSecret = require("./room_secret")(sequelize, Sequelize);

// model을 만들때 자동으로 id값을 생성함
// 그리고 이 밑에서 테이블간의 관계를 자동으로 지정함
// 관계를 알아서 설정해 줌

////////////////////////////////////////////////////////////////
// 1 : 1
////////////////////////////////////////////////////////////////
// member
db.LoginHistory.hasOne(db.Member, { foreignKey: "member_id" });
db.LoginSecret.hasOne(db.Member, { foreignKey: "member_id" });

// Room
db.RoomHistory.hasOne(db.Room, { foreignKey: "room_id" });
db.RoomSecret.hasOne(db.Room, { foreignKey: "room_id" });

////////////////////////////////////////////////////////////////
// 1 : n
////////////////////////////////////////////////////////////////
// db.Users.hasMany(db.Posts);

////////////////////////////////////////////////////////////////
// n : m
////////////////////////////////////////////////////////////////
// room_member
db.Member.belongsToMany(db.Room, {
  foreignKey: "member_id",
  through: "Room_Member",
});
db.Room.belongsToMany(db.Member, {
  foreignKey: "room_id",
  through: "Room_Member",
});

// blacklist
db.Member.belongsToMany(db.Room, {
  foreignKey: "member_id",
  through: "Blacklist",
});
db.Room.belongsToMany(db.Member, {
  foreignKey: "room_id",
  through: "Blacklist",
});

module.exports = db;
