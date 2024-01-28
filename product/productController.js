const express = require('express')
const product = require('./productModel')
const categories = require('../category/categoryModel')
const sub_category = require('../sub_category/subCategoryModel')
const { Op } = require('sequelize');
const { sequelize } = require('sequelize');

//create product 
const addProduct = async (req, res) => {
   try {
      //    const data = {
      //     product_name : req.body,
      //     product_color : req.body,
      //     product_price : req.body,
      //     isFeature : req.body,
      //     product_desc : req.body,
      //     product_image: req.body,
      //     product_quantity : req.body,
      //     category_id : req.body,
      //     sub_category_id : req.body
      //    }
      const data = req.body
      console.log(data, "daya");
      const createProduct = await product.create(data)
      console.log(createProduct);
      //    return createProduct.product.dataValues
      return res.status(201).json(createProduct); // Return the created data

   } catch (error) {
      res.send(error)
   }
}


const getProduct = async (req, res) => {
   try {
      const allProduct = await product.findAll()
      return res.send(allProduct)
   } catch (error) {
      return res.send(error)
   }
}



const getProductByCategory = async (req, res) => {
   try {
      const cat_name = req.params.category
      console.log(cat_name, "cat");
      const getCat = await categories.findOne({
         where: {
            Category_name: cat_name
         }
      })
      let getProductbyCat;
      if (getCat) {
         getProductbyCat = await product.findAll({
            where: {
               category_id: getCat.dataValues.id
            }
         })
         console.log(getProductbyCat, "getProductbyCat");
         return res.send(getProductbyCat)
      }
      else {
         getProductbyCat = []
      }

      // console.log("getcat" , getCat);
      return res.send(getProductbyCat)
   } catch (error) {
      return res.send(error)
   }
}


const getProductBySubCategory = async (req, res) => {
   try {
      const cat_name = req.params.subcategory
      console.log(cat_name, "cat" , "hvhvh");
      const getCat = await sub_category.findOne({
         where: {
            sub_Category_name: cat_name
         }
      })
      let getProductbyCat;
      if (getCat) {
         getProductbyCat = await product.findAll({
            where: {
               sub_category_id: getCat.dataValues.id
            }
         })
         console.log(getProductbyCat, "getProductbyCat");
         return res.send(getProductbyCat)
      }
      else {
         getProductbyCat = []
      }

      // console.log("getcat" , getCat);
      return res.send(getProductbyCat)
   } catch (error) {
      console.log(error);
      return res.send(error)
   }
}




module.exports = { addProduct, getProduct, getProductByCategory , getProductBySubCategory }