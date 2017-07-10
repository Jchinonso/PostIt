
module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        Groups.hasMany(models.UserGroups, {
          foreignKey: 'groupId',
        });
        Groups.hasMany(models.Messages, {
          foreignKey: 'groupId',
          as: 'groupMessages'
        });
      }
    }
  });
  return Groups;
};
