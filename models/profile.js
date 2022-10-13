'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    get formattedDob() {
      return this.dateOfBirth = this.dateOfBirth.toLocaleDateString('en-CA', {year:"numeric", month:"numeric", day:"numeric"})
    }

    formatPhone (data) {
      
    }
  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg: 'first Name is required'
        },
        notNull : {
          msg: 'first Name is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg: 'Last Name is required'
        },
        notNull : {
          msg: 'Last Name is required'
        }
      }
    },
    dateOfBirth: {
      type : DataTypes.DATE,
      allowNull : false,
      validate: {
        notEmpty : {
          msg: 'Date of Birth is required'
        },
        notNull : {
          msg: 'Date of Birth is required'
        }
      }
    },
    phoneNumber: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate: {
        notEmpty : {
          msg: 'Phome Number is required'
        },
        notNull : {
          msg: 'Phome Number is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};