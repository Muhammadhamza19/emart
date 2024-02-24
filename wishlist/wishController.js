const express = require('express')
const wishlist = require('./wishlistModel');
const User = require('../Users/usermodel');
const product = require('../product/productModel');
const order = require('../order/orderModel');
const cart = require('../cart/cartModels');
//create product 
const addtowishlist = async (req, res) => {
   try {
      const data = req.body
      console.log(data, "daya");

      const wishlistexited = await wishlist.findOne({
         where: {
            user_id: req.body.user_id,
            product_id: req.body.product_id
         }
      })
      if (wishlistexited) {
         const updatewishklist = await wishlist.update({ is_active: 1 }, {
            where:
            {
               user_id: req.body.user_id,
               product_id: req.body.product_id
            }
         })
         return res.status(201).json(updatewishklist)

      } else {
         const createWishList = await wishlist.create(data)
         console.log(createWishList);
         return res.status(201).json(createWishList); // Return the created data
      }
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

      console.log("user", userid, alluserWishList);

      return res.send(alluserWishList);
   } catch (error) {
      return res.send(error)
   }
}



const getSpecificWishList = async (req, res) => {
   try {
      const wishlist_id = req.params.WishList_id

      const getwishList_byid = await wishlist.findOne({
         where: {
            id: wishlist_id
         },
         include: [
            {
               model: product,
               attributes: ['id', 'product_name']
            }
         ]

      })


      console.log(getwishList_byid);
      return res.send(getwishList_byid)



   } catch (error) {
      return res.send(error)
   }
}


const removeWishListItem = async (req, res) => {
   try {
      console.log("hello");
      const wishlist_id = req.params.WishList_id

      const getwishList_byid = await wishlist.findOne({
         where: {
            id: wishlist_id
         }

      })
      if (getwishList_byid) {
         const removeWishList = await wishlist.update({ is_active: 0 },
            {
               where: {
                  id: wishlist_id
               },
            }

         )
      }

      console.log(getwishList_byid);
      return res.send({ message: "updated" })



   } catch (error) {
      return res.send(error)
   }
}





const getWishListByProductIDAndUserId = async (req, res) => {
   try {
      const user_id = Number(req.params.user_id);
      console.log(user_id, "user");
      const product_id = Number(req.params.product_id);
      console.log(product_id, "product_id");
      const getwishList_byid = await wishlist.findOne({
         where: {
            user_id: user_id,
            product_id: product_id
         },

      })
      console.log(getwishList_byid, "getwishList_byid");
      return res.send(getwishList_byid)
   } catch (error) {
      return res.send(error)
   }
}

const countItemByUser_id = async (req, res) => {
   try {
      const user_id = Number(req.params.user_id);
      console.log(user_id, "user");
      const wishlistCount = await wishlist.count({
         where: {
            user_id: user_id,
            is_active: 1
         },
      })
      const orderCount = await order.count({
         where: {
            user_id: user_id,
         },
      })
      const cartCount = await cart.count({
         where: {
            user_id: user_id,
         },
      })
      const response = {
         wishlistCount: wishlistCount,
         orderCount: orderCount,
         cartCount: cartCount

      }
      return res.send(response)
   } catch (error) {
      return res.send(error)
   }
}


const removeWishlistByUserAndProductID = async (req, res) => {
   try {
      const user_id = Number(req.params.user_id);
      const product_id = Number(req.params.product_id)
      console.log(user_id, "user");
      const removeWishList = await wishlist.update({ is_active: 0 },
         {
            where: {
               user_id: user_id,
               product_id: product_id
            },
         }

      )
      console.log(removeWishList);
      return res.send({ message: "updated" })
   } catch (error) {
      console.log(error);
      return res.send(error)
   }
}





module.exports = { removeWishlistByUserAndProductID, addtowishlist, listWishList, getSpecificWishList, removeWishListItem, getWishListByProductIDAndUserId, countItemByUser_id }