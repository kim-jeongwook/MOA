/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room', {
    room_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    room_url: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    is_secret: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    master_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'room',
    timestamps: true,		    // createAt, updatedAt
    paranoid: true          // deletedAt
  });
};
