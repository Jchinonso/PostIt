
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
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
    sender: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  Messages.associate = (models) => {
    Messages.belongsTo(models.Groups, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE'
    });
  };
  return Messages;
};
