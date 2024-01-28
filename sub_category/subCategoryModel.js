// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionDB');
const category = require('../category/categoryModel')
const sub_category = sequelize.define('sub_category', {
 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    sub_Category_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories', 
      key: 'id', 
    },

    // hamza
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
sub_category.belongsTo(category, { foreignKey: 'category_id' });

module.exports = sub_category;
