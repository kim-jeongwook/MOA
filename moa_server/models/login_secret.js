/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('login_secret', {
    member_id: {
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
    tableName: 'login_secret',
    timestamps: true,		    // createAt, updatedAt
    paranoid: true          // deletedAt
  });
};
