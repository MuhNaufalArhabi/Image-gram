'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
    }

    formatEmail(data){
      return this.email = data.toLowerCase()
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg: 'Username is required'
        },
        notNull : {
          msg: 'Username is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg: 'Password is required'
        },
        notNull : {
          msg: 'Password is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        isEmail: {
          msg: `Email format must be with @`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg: 'Role is required'
        },
        notNull : {
          msg: 'Role is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    let salt = bcrypt.genSaltSync(6);
    let hash = bcrypt.hashSync(user.password, salt);
    user.email = user.formatEmail(user.email)
    user.password = hash
  })
  return User;
};