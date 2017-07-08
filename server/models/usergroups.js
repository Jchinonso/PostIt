
module.exports = (sequelize, DataTypes) => {
  const UserGroups = sequelize.define('UserGroups', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    groupId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate(models) {
        UserGroups.belongsTo(models.Users, {
          foreignKey: 'userId',
        });
        UserGroups.belongsTo(models.Groups, {
          foreignKey: 'groupId',
        });
      },
    }
  });
  return UserGroups;
};