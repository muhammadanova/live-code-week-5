'use strict';

// const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {} 

  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name must be field"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email must be field"
        },
        isEmail: {
          args: true,
          msg: "Email wrong format"
        }
      }
    },
    password: DataTypes.STRING
  },
  {
    // hooks: {
    //   beforeCreate: (user, options) => {
    //     user.password = bcrypt.hashSync(user.password, 10)
    //   }
    // },
    sequelize
  })

  User.associate = function(models) {
    
  };
  return User;
};