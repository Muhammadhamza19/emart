
const { Sequelize } = require('sequelize');
const config = require('./connectDB.json');

const env = process.env.NODE_ENV || 'development';
const { database, username, password, ...options } = config[env];
const sequelize = new Sequelize(database, username, password, options);

module.exports = sequelize;
