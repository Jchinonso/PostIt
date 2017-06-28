
module.exports = (sequelize, DataTypes) => {
  var Messages = sequelize.define('Messages', {
    content: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'normal',
    },
    groupId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Messages.belongsTo(models.Groups, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Messages;
};