/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room_history', {
    member_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    room_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    retry: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    LastfailedEnter: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    LastSuccessEnter: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'room_history',
    timestamps: true,		    // createAt, updatedAt
    paranoid: true          // deletedAt
  });
};
