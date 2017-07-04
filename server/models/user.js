import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken'


module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.UserGroups, {
          foreignKey: 'userId',
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
