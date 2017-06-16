'use strict';
module.exports = function(sequelize, DataTypes) {
  var GroupMessages = sequelize.define('GroupMessages', {
    messageId:{
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    groupId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    classMethods: {
      associate(models) {
        GroupMessages.belongsTo(models.Messages, {
          foreignKey: 'messageId',
        });
         GroupMessages.belongsTo(models.Groups, {
          foreignKey: 'groupId',
        })
      },
    }
  });
  return GroupMessages;
};