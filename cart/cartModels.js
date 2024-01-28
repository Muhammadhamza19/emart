// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionDB');
const User = require('../Users/usermodel')
const product = require('../product/productModel')
const cart = sequelize.define('cart', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING,
        allowNull : true
    },
    quality: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    seller_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull : true
    },
    tprice: {
        type: DataTypes.INTEGER,
        allowNull : true
    },
    product_id:{
        type : DataTypes.INTEGER,
        allowNull: true
    }
   
});

cart.belongsTo(User, { foreignKey: 'user_id' });
cart.belongsTo(product, { foreignKey: 'product_id' });


module.exports = cart;
