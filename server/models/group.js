
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
      unique: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  });
  Groups.associate = (models) => {
    Groups.belongsToMany(models.Users, {
      through: 'UserGroups',
      foreignKey: 'groupId',
    });
    Groups.hasMany(models.Messages, {
      foreignKey: 'groupId',
      as: 'groupMessages'
    });
  };
  return Groups;
};
