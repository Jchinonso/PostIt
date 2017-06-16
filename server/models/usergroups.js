'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserGroups = sequelize.define('UserGroups', {
     userId: {
      allowNull: false,
      type: DataTypes.STRING
    },
     groupId: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        UserGroups.belongsTo(models.Users, {
          foreignKey: 'userId',
        });
         UserGroups.belongsTo(models.Groups, {
          foreignKey: 'groupId',
        });
      },
    }
  });
  return UserGroups;
};