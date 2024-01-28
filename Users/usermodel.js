// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionDB');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURL :{
    type : DataTypes.STRING,
    allowNull : true
  },
  UserType :{
    type : DataTypes.INTEGER,
    allowNull : true
  },
  Role :{
    type : DataTypes.STRING,
    allowNull : true
  }
});

module.exports = User;
