const express = require('express')
const cart = require('./cartModels');
const { Model } = require('sequelize');
const product = require('../product/productModel');


//create product 
const addcart = async (req, res) => {
   try {
      const data = req.body
      console.log(data, "daya");
      const createProduct = await cart.create(data)
      console.log(createProduct);
      //    return createProduct.product.dataValues
      return res.status(201).json(createProduct); // Return the created data

   } catch (error) {
      res.send(error)
   }
}


const getUserCart = async (req, res) => {
   try {
    const userid = req.params.user_id
    const alluserCart = await cart.findAll({
        where: {
          user_id: userid,
        },
        include: [
          {
            model: product, 
            attributes: ['id', 'product_name'], 
          },
        ],
      });
    
    
      return res.send(alluserCart);
   } catch (error) {
      return res.send(error)
   }
}



const getSpecificCart = async (req, res) => {
   try {
      const cart_id = req.params.cartId
      
         getCart = await cart.findOne({
            where :{
                id : cart_id
            },
           include :[
{
    model : product,
    attributes : ['id' , 'product_name']
}
           ]
            
         })
        //  console.log(getCart, "getCart");

         const cartDetails = {
            cart_id: getCart.id,
            user_id: getCart.user_id,
            product: {
              id: getCart.product.id,
              productName: getCart.product.product_name,
             
            },
          };
          console.log(cartDetails);
         return res.send(getCart)
      

   
   } catch (error) {
      return res.send(error)
   }
}






module.exports = { addcart , getSpecificCart , getUserCart }