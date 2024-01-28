// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionDB');
const product = require('../product/productModel')
const User = require('../Users/usermodel')

const wishlist = sequelize.define('wishlist', {

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  is_active: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
});



wishlist.belongsTo(User, { foreignKey: 'user_id' });
wishlist.belongsTo(product, { foreignKey: 'product_id' });
module.exports = wishlist;
