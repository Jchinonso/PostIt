
module.exports = (sequelize, DataTypes) => {
  var Messages = sequelize.define('Messages', {
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    creatorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    is_read: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    }
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Users, {
          foreignKey: 'creatorId'
        });
      }
    }
  });
  return Messages;
};