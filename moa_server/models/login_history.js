/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('login_history', {
    member_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    retry: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    LastFailedLogin: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    LastSuccessedLogin: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'login_history',
    timestamps: true,		    // createAt, updatedAt
    paranoid: true          // deletedAt
  });
};
