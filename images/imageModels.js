// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionDB');
const product = require('../product/productModel')
// const imageProduct = require('../Users/usermodel')

const imageProduct = sequelize.define('imageProduct', {


  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  image_link: {
    type: DataTypes.STRING,
    
  },
});


product.hasMany(imageProduct, { foreignKey: 'product_id' });
imageProduct.belongsTo(product, { foreignKey: 'product_id' });
module.exports = imageProduct;
