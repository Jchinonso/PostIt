
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
      validate: {
        len: {
          args: [6, 255],
          msg: 'password must be at least six characters long'
        }
      }
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

