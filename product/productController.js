const express = require('express')
const product = require('./productModel')
const categories = require('../category/categoryModel')
const sub_category = require('../sub_category/subCategoryModel')
const imageProduct = require('../images/imageModels')
const { Op, where } = require('sequelize');
const { sequelize } = require('sequelize');

//create product 
const addProduct = async (req, res) => {
   try {
         const data = {
          product_name : req.body.product_name,
          product_color : req.body.product_color,
          product_price : req.body.product_price,
          isFeature : req.body.isFeature,
          product_desc : req.body.product_desc,
          product_image: req.body.product_image,
          product_quantity : req.body.product_quantity,
          category_name : req.body.category_name,
          sub_category_name : req.body.sub_category_name,
          seller_name :req.body.seller_name,
          vendor_id : req.body.vendor_id
         }
      // const data = req.body
      console.log(data, "daya");
      const createProduct = await product.create(data)
      console.log(createProduct , "crerefded" , req.body.images);
let addimage;
let dataArray =[]
if(createProduct){
   for(let i =0 ; i<= req.body.images.length -1 ; i++){
      let datassss ={
         image_link : req.body.images[i],
         product_id : createProduct.id
      }
      addimage = await imageProduct.create(datassss)
      dataArray.push(req.body.images[i])
console.log(addimage , "addimage");
   }
}


const response = {
   product : createProduct , 
   image :dataArray
}



      //    return createProduct.product.dataValues
      return res.status(201).json(response); // Return the created data

   } catch (error) {
      console.log(error , "err");
      res.send(error)
   }
}


const getProduct = async (req, res) => {
   try {
      const allProducts = await product.findAll(
         {
         include: [{
           model: imageProduct,
           required: false, 
           attributes: ['image_link'] 
         }]
       }
       );
       console.log(allProducts , "allProducts");
       
       const formattedProducts = allProducts.map(product => {
         let is_feature ;
         if(product.isFeature == 0){
            is_feature = false
         } else if(product.isFeature == 1){
            is_feature = true
         }

         return {
           id: product.id,
           product_name: product.product_name,
           product_color: product.product_color,
           product_price: product.product_price,
           isFeature: is_feature,
           product_desc: product.product_desc,
           product_image: product.product_image,
           product_quantity: product.product_quantity,
           category_name: product.category_name,
           sub_category_name: product.sub_category_name,
           createdAt: product.createdAt,
           updatedAt: product.updatedAt,
           vendor_id: product.vendor_id,
           seller_name: product.seller_name,
           imageProducts: product.imageProducts.map(img => img.image_link)

         }
      })
      // // const allImages = await imageProduct.findAll( )
      return res.send(formattedProducts)
   } catch (error) {
      console.log(error , "errr");
      return res.send(error)
   }
}



const getProductByCategory = async (req, res) => {
   try {
      const cat_name = req.params.category
      
      const  getProductbyCat = await product.findAll({
            where: {
               category_name: cat_name},
               include: [{
                  model: imageProduct,
                  required: false, 
                  attributes: ['image_link'] 
                }]
            
         })
         const formattedProducts = getProductbyCat.map(product => {
            let is_feature ;
            if(product.isFeature == 0){
               is_feature = false
            } else if(product.isFeature == 1){
               is_feature = true
            }
            return {
              id: product.id,
              product_name: product.product_name,
              product_color: product.product_color,
              product_price: product.product_price,
              isFeature: is_feature,
              product_desc: product.product_desc,
              product_image: product.product_image,
              product_quantity: product.product_quantity,
              category_name: product.category_name,
              sub_category_name: product.sub_category_name,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
              vendor_id: product.vendor_id,
              seller_name: product.seller_name,
              imageProducts: product.imageProducts.map(img => img.image_link)
   
            }
         })
         console.log(getProductbyCat, "getProductbyCat");
         return res.send(formattedProducts)
      

   
   } catch (error) {
      console.log(error , "erro");
      return res.send(error)
   }
}


const getProductBySubCategory = async (req, res) => {
   try {
      const cat_name = req.params.subcategory
      
        const getProductbyCat = await product.findAll({
            where: {
               sub_category_name: cat_name
            },
               include: [{
                  model: imageProduct,
                  required: false, 
                  attributes: ['image_link'] 
                }]
            
         })
         const formattedProducts = getProductbyCat.map(product => {
            let is_feature ;
            if(product.isFeature == 0){
               is_feature = false
            } else if(product.isFeature == 1){
               is_feature = true
            }
            return {
              id: product.id,
              product_name: product.product_name,
              product_color: product.product_color,
              product_price: product.product_price,
              isFeature: is_feature,
              product_desc: product.product_desc,
              product_image: product.product_image,
              product_quantity: product.product_quantity,
              category_name: product.category_name,
              sub_category_name: product.sub_category_name,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
              vendor_id: product.vendor_id,
              seller_name: product.seller_name,
              imageProducts: product.imageProducts.map(img => img.image_link)
   
            }
         })
         console.log(getProductbyCat, "getProductbyCat");
         return res.send(formattedProducts)
      
   } catch (error) {
      console.log(error);
      return res.send(error)
   }
}


const getProductByFeature = async (req, res) => {
   try {
      const feature = req.params.isFeature === 'true';

      // const feature = req.params.isFeature
      console.log(Boolean(feature) , "feature");
        const getAllProductByFeature = await product.findAll({
            where: {
               isFeature: Boolean(feature)},
               include: [{
                  model: imageProduct,
                  required: false, 
                  attributes: ['image_link'] 
                }]
            
         })
         const formattedProducts = getAllProductByFeature.map(product => {
            let is_feature ;
            if(product.isFeature == 0){
               is_feature = false
            } else if(product.isFeature == 1){
               is_feature = true
            }
            return {
              id: product.id,
              product_name: product.product_name,
              product_color: product.product_color,
              product_price: product.product_price,
              isFeature: is_feature,
              product_desc: product.product_desc,
              product_image: product.product_image,
              product_quantity: product.product_quantity,
              category_name: product.category_name,
              sub_category_name: product.sub_category_name,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
              vendor_id: product.vendor_id,
              seller_name: product.seller_name,
              imageProducts: product.imageProducts.map(img => img.image_link)
   
            }
         })
         console.log(getAllProductByFeature.dataValues, "getAllProductByFeature");
         return res.send(formattedProducts)
      
   } catch (error) {
      console.log(error);
      return res.send(error)
   }
}

const searchProduct = async(req,res)=>{
   try {
      const searchTerm= req.params.product_name  
     const prod_search = await product.findAll({
      where :{
      product_name: {
         [Op.like]: `%${searchTerm}%` 
      },
   },
      include: [{
         model: imageProduct,
         required: false, 
         attributes: ['image_link'] 
       }]
   
     }) 


     const formattedProducts = prod_search.map(product => {
      let is_feature ;
      if(product.isFeature == 0){
         is_feature = false
      } else if(product.isFeature == 1){
         is_feature = true
      }
      return {
        id: product.id,
        product_name: product.product_name,
        product_color: product.product_color,
        product_price: product.product_price,
        isFeature: is_feature,
        product_desc: product.product_desc,
        product_image: product.product_image,
        product_quantity: product.product_quantity,
        category_name: product.category_name,
        sub_category_name: product.sub_category_name,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        vendor_id: product.vendor_id,
        seller_name: product.seller_name,
        imageProducts: product.imageProducts.map(img => img.image_link)

      }
   })


     console.log(prod_search , "hello");
     return res.send(formattedProducts)
   } catch (error) {
      console.log(error)
      return error
   }
}


const updateFeatureOfProduct = async(req,res)=>{
   try {

      const updatefeature = await product.update({isFeature : req.body.isFeature} , {where :{id : req.body.product_id , vendor_id : req.body.vendor_id}})
      console.log(updatefeature , "feature");
      return res.send({message : "updated successfully"})

   } catch (error) {
      console.log(error , "error");
      return res.send(error)
   }
}



//ALTER TABLE products
// ADD COLUMN vendor_id Int default null;
// ALTER TABLE products
// ADD COLUMN seller_name varchar(255) default null;

module.exports = { addProduct, getProduct, getProductByCategory , getProductBySubCategory , getProductByFeature , searchProduct  , updateFeatureOfProduct}