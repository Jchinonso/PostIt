
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 6,
          msg: 'password must be at least six characters long'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'mobile number cannot be an empty string'
        },
        isNumeric: {
          msg: 'mobile number is invalid'
        }
      }
    },
  });
  Users.associate = (models) => {
    Users.belongsToMany(models.Groups, {
      through: 'UserGroups',
      foreignKey: 'userId',
    });
  };
  return Users;
};

