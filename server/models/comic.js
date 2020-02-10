'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Comic extends Model {}

  Comic.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty: {
          args : true,
          msg: "Title must be field"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Author must be field"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image URL must be field"
        }
      }
    }
  },
  {
    sequelize
  })

  Comic.associate = function(models) {
    
  };

  return Comic;
};