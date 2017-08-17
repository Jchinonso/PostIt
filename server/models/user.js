
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'incorrect Email'
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  });
  Users.associate = (models) => {
    Users.belongsToMany(models.Groups, {
      through: 'UserGroups',
      foreignKey: 'userId',
    });
  };
  return Users;
};

