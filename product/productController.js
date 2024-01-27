const express = require('express')
const product = require('./productModel')

//create product 
const addProduct = async(req,res)=>{
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
   console.log(data , "daya");
   const createProduct = await product.create(data)
  console.log(createProduct);
//    return createProduct.product.dataValues
   return res.status(201).json(createProduct); // Return the created data

} catch (error) {
res.send(error)}
}


const getProduct = async(req , res)=>{
try {
    const allProduct = await product.findAll()
    return res.send(allProduct)
} catch (error) {
   return res.send(error)
}
}

module.exports = {addProduct ,getProduct}