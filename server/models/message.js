
module.exports = function(sequelize, DataTypes){
  var Message = sequelize.define('Message', {
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    groupId: {
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
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId'
        });
      }
    }
  });
  return Message;
};