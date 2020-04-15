/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "member",
    {
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      f_profile: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "default.jpg",
      },
    },
    {
      tableName: "member",
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    }
  );
};
