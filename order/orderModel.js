// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionDB');
const User = require('../Users/usermodel');
const product = require('../product/productModel');


const order = sequelize.define('order', {
  order_by: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_by_address: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_by_email: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_by_name: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_by_phone: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_by_postalcode: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_by_state: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_code: {
    type: DataTypes.INTEGER,
    allowNull : true
  },
  order_confirmed: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_date: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_delivered: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_on_delivery: {
    type: DataTypes.STRING,
    allowNull : true
  },
  order_placed: {
    type: DataTypes.STRING,
    allowNull : true
  },
  payment_method : {
    type :DataTypes.STRING,
    allowNull : true
  },
shipping_method : {
  type : DataTypes.STRING,
  allowNull : true
},
totalAmount : {
  type : DataTypes.FLOAT,
  allowNull : true
},
user_id :{
  type : DataTypes.INTEGER,
  allowNull : true
},
product_id :{
  type : DataTypes.INTEGER,
  allowNull : true
},



});

order.belongsTo(User, { foreignKey: 'user_id' });
order.belongsTo(product, {foreignKey : 'product_id'})
module.exports = order;
