/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room_secret', {
    room_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    secret_key: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'room_secret',
    timestamps: true,		    // createAt, updatedAt
    paranoid: true          // deletedAt
  });
};
