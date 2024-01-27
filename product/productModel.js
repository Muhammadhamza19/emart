// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionDB');
const categories = require('../category/categoryModel');
const sub_category = require('../sub_category/subCategoryModel')

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
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
   
  },
  sub_category_id: {
    type: DataTypes.INTEGER,
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
});

product.belongsTo(categories, { foreignKey: 'category_id' });
product.belongsTo(sub_category, { foreignKey: 'sub_category_id' });

module.exports = product;
