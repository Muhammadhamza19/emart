const express = require('express')

const order = require('../order/orderModel');
const orderDetails = require('../orderDetails/orderDetailsModels');

//add orders

const addOrders = async(req, res) => {
    try {
        const data = {
            order_by: req.body.order_by,
            order_by_address: req.body.order_by_address,
            order_by_email: req.body.order_by_email,
            order_by_name: req.body.order_by_name, 
            order_by_phone: req.body.order_by_phone,
            order_by_postalcode: req.body.order_by_postalcode,
            order_by_state: req.body.order_by_state,
            order_code: req.body.order_code,
            order_confirmed: req.body.order_confirmed,
            order_date: req.body.order_date,
            order_delivered: req.body.order_delivered,
            order_on_delivery: req.body.order_on_delivery,
            order_placed: req.body.order_placed,
            payment_method: req.body.payment_method,
            shipping_method: req.body.shipping_method,
            totalAmount: req.body.totalAmount,
            user_id: req.body.user_id,
            product_id: req.body.product_id
        };
        
        const createdOrder = await order.create(data);
        console.log(createdOrder);
console.log(req.body.order_code);
let createDetails;
        if (createdOrder) {
            for (let i = 0; i < req.body.order_details.length; i++) { // Corrected loop condition
                const orderDetailData = req.body.order_details[i]; // Extract details from req.body.order_details[i]
                const detailData = {
                    order_id : createdOrder.id,
                    order_code: req.body.order_code, 
                    Color: orderDetailData.Color,
                    img: orderDetailData.img,
                    title: orderDetailData.title,
                    vendor_id: orderDetailData.vendor_id
                };
                console.log(detailData , "detailData");
                 createDetails = await orderDetails.create(detailData);
            }
        }
const response = {
    orders :createdOrder,
    orderDetails :createDetails
}
        console.log(createdOrder);
        return res.status(201).json(response); 
    } catch (error) {
        console.error(error.message, "err");
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



//get orders

const getOrders = async(req,res)=>{
try {
    const AllOrders = await order.findAll(
        {
            include: [{
              model: orderDetails,
              required: false, 
            //   attributes: ['order_code' ] 
            }]
          }
    )
//     let data =[]
//     addOrders.map(item =>{
//         if(item.)
// data.push({...AllOrders , })
//     })
    console.log(AllOrders);
    return res.send(AllOrders)
} catch (error) {
    console.log(error, "err");
    return error
}

//get orderbyId




}

const getOrdersByID = async(req,res)=>{
    try {
        const id = req.params.id
        const orders = await order.findOne({where : {id : id},
            include: [{
                model: orderDetails,
                required: false, 
                // attributes: ['image_link'] 
              }]
        },
            )
        return res.send(orders)
    } catch (error) {
        console.log(error , "ii");
        return error
    }
}


const getOrdersByuserID = async(req,res)=>{
    try {
        const user_id = req.params.user_id
        console.log(user_id);
        const orders = await order.findAll({where :{user_id : user_id}
           , include: [{
                model: orderDetails,
                required: false, 
                // attributes: ['image_link'] 
              }]
        },)
        let data
        console.log("hfjdnfuifjnu");
        if(orders.length >0){   
                 data = {
                    message : "result",
                    orders : orders
                 }
        }else {

            data = {
                message : "result",
                orders : []
            }
             } 
             
             
             console.log("uefuhwefhwef");
            return res.send(data)
            } catch (error) {
        return error
    }
}
module.exports = {addOrders ,getOrdersByID , getOrders ,getOrdersByuserID}