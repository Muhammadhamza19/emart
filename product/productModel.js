// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionDB');


const product = sequelize.define('product', {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_color: {
    type: DataTypes.STRING,
  },
  product_price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale accordingly
    allowNull: false,
  },
  isFeature: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  product_desc: {
    type: DataTypes.STRING,
  },
  product_image: {
    type: DataTypes.STRING,
  },
  product_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  sub_category_name: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
   vendor_id :{
    type: DataTypes.INTEGER,
    allowNull: true,
   },

   seller_name :{
    type: DataTypes.STRING,
    allowNull: true,
   }


});



module.exports = product;
