
module.exports = (sequelize, DataTypes) => {
  var Messages = sequelize.define('Messages', {
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    priority: {
      allowNull: false,
      type: DataTypes.STRING,
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