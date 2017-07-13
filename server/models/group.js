
module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    creatorId: {
      type: DataTypes.INTEGER
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
        Groups.belongsTo(models.Users, {
          foreignKey: 'creatorId',
        });
      }
    }
  });
  return Groups;
};
