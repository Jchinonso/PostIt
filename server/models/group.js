'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.User, {
          foreignKey: 'groupId',
        });
        Group.hasMany(models.Message, {
          foreignKey: 'groupId',
        });
      }
    }
  });
  return Group;
};