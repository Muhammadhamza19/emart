const express = require('express')
const wishlist = require('./wishlistModel');
const User = require('../Users/usermodel');
const product = require('../product/productModel')
//create product 
const addtowishlist = async (req, res) => {
   try {
      const data = req.body
      console.log(data, "daya");
      const createWishList = await wishlist.create(data)
      console.log(createWishList);
      return res.status(201).json(createWishList); // Return the created data

   } catch (error) {
      res.send(error)
   }
}


const listWishList = async (req, res) => {
   try {
    const userid = req.params.user_id
    console.log(userid);
    const alluserWishList = await wishlist.findAll({
        where: {
          user_id: userid,
        },
        include: [
          {
            model: product, 
            attributes: ['id', 'product_name'], 
          },
        //   {
        //     model : User

        //   }
        ],
      });
    
      console.log("user" , userid ,alluserWishList );
    
      return res.send(alluserWishList);
   } catch (error) {
      return res.send(error)
   }
}



const getSpecificWishList = async (req, res) => {
   try {
      const wishlist_id = req.params.WishList_id
      
        const getwishList_byid = await wishlist.findOne({
            where :{
                id : wishlist_id
            },
           include :[
{
    model : product,
    attributes : ['id' , 'product_name']
}
           ]
            
         })

        
          console.log(getwishList_byid);
         return res.send(getwishList_byid)
      

   
   } catch (error) {
      return res.send(error)
   }
}






module.exports = { addtowishlist , listWishList , getSpecificWishList }