
module.exports = (sequelize, DataTypes) => {
  var Groups = sequelize.define('Groups', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Groups.hasMany(models.UserGroups, {
          foreignKey: 'groupId',
        });
        Groups.hasMany(model.Messages, {
          foreignKey: 'groupId',
          as: "groupMessages"
        });
      }
    }
  });
  return Groups;
};