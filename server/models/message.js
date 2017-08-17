
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    content: {
      allowNull: false,
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
  });
  Messages.associate = (models) => {
    Messages.belongsTo(models.Groups, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE'
    });
  };
  return Messages;
};
