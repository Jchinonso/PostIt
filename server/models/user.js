
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


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
    }
  }, {
    classMethods: {
      associate(models) {
        Users.hasMany(models.UserGroups, {
          foreignKey: 'userId',
        });
        Users.hasMany(models.Groups, {
          foreignKey: 'creatorId'
        });
      }
    },


    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
      },

      beforeUpdate: (user) => {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return Users;
};
