const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionDB');
const order = require('../order/orderModel');

const orderDetails = sequelize.define('orderDetails', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Color: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  vendor_id: {
    type: DataTypes.INTEGER,
  },
});
order.hasMany(orderDetails, { foreignKey: 'order_id' });

orderDetails.belongsTo(order, { foreignKey: 'order_id' });

module.exports = orderDetails;
